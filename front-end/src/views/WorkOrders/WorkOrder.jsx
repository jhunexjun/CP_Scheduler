import { /*createContext,*/ useState, useCallback, } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { PDFViewer } from '@react-pdf/renderer';
import workOrderDocumentContainer from './Prints/WorkOrderDocumentContainer';

import JsBarcode from 'jsbarcode';

import UilReact from '@iconscout/react-unicons/icons/uil-react';
import UilSearchAlt from '@iconscout/react-unicons/icons/uil-search-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import { DataGrid, Column, Selection, Paging, FilterRow, SearchPanel } from 'devextreme-react/data-grid';


const defaultData = {
			data: {
				table: [
					{
						CUST_NO: "",
						SLS_REP: "",
						TKT_NO: "",
						TERMS_COD: "",
						CUST_PO_NO: "",
						TKT_DAT: "",
						DESCR: "",
						ITEM_NO: "",
						BILL_CITY: null,
						BILL_EMAIL_ADRS_1: "",
						BILL_NAM: "",
						BILL_PHONE_1: "",
						BILL_STATE: null,
						BILL_ZIP_COD: null,
						SHIP_CITY: null,
						billAddress: "",
						SHIP_VIA_COD: "",
						SHIP_DAT: "",
						SHIP_NAM: "",
						SHIP_PHONE_1: "",
						SHIP_STATE: null,
						SHIP_ZIP_COD: null,
						shipAddress: "",
						hours: 0,
						SalesQty: 0,
						//NOTE_DAT: "",
						//NOTE_TXT: "",
						USR_APPT_DAT: null,
						USR_APPT_TIM: null,
						USR_CUSTOMER_OWN_PARTS: null,
						USR_EXTERIOR: null,
						USR_ID: "",
						USR_LIC_PLATE: "",
						USR_MAKE: "",
						USR_MODEL: "",
						USR_ODOMETER_IN: "",
						USR_ODOMETER_OUT: null,
						USR_RETAIN_PARTS: null,
						USR_SERVICE_IN_DAT: null,
						USR_SERVICE_IN_TIM: null,
						USR_SERVICE_OUT_DAT: null,
						USR_SERVICE_OUT_TIM: null,
						USR_SERVICE_TYP: "",
						USR_VEHICLE_INFO: "",
						USR_VIN_NO: "",
						USR_WHEEL_LOCK: null,
						USR_YR: '',
					}
				],
				notes: [{
					NOTE_DAT: "",
					NOTE_TXT: "",
				}],
				barcode: { base64: null },
			},
	}

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
	const [invoiceNo, setInvoiceNo] = useState('');
	const { sessionId } = useParams();
	const [data, setData] = useState(defaultData);
	const [popupVisible, setPopupVisible] = useState(false);
	const navigate = useNavigate();
	const [workOrders, setWorkOrders] = useState([]);
	const [displayWorkOrder, setDisplayWorkOrder] = useState(false);
	const [selectedWorkOrderNo, setSelectedWorkOrderNo] = useState(null);

	const fetchInvoiceData = useCallback(async (invoiceNo) => {
		await fetch(`${adminUrl}/invoice?sessionId=${sessionId}&invoiceNo=${invoiceNo}`)
			.then((res) => {
				return res.json()
			})
			.then((invoice) => {
				if (invoice.status === 'Error') {
					navigate('/');
				} else if (invoice.data.table.length <= 0) {
					setData(defaultData);
				} else {
					invoice.data.barcode.base64 = getImgBase64String(invoice.data.table[0].TKT_NO);
					setData(invoice);
					setDisplayWorkOrder(true);
				}
			});
	}, []);

	const fetchInvoiceList = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/invoiceslist?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setWorkOrders(res.data);
			});
	}, []);

	function getImgBase64String(value) {
		const barcodeNode = document.getElementById('barcode');
		JsBarcode(barcodeNode, value, {displayValue: false});
		return barcodeNode.src;
	}

	async function fetchInvoice() {
		setDisplayWorkOrder(false);
		await fetchInvoiceData(invoiceNo);
	}

	const selectButtonOptions = {
		text: 'Select',
		onClick: hideAndSelect,
	}

	const closeButtonOptions = {
		text: 'Close',
		onClick: hideInfo,
	}

	function hideInfo() {
		setPopupVisible(false);
	}

	function hideAndSelect() {
		setDisplayWorkOrder(false);
		setInvoiceNo(selectedWorkOrderNo);
		setPopupVisible(false);
	}

	async function showInvoiceList() {
		setPopupVisible(true);
		await fetchInvoiceList();
	}

	function showTheInvoice() {
		if (displayWorkOrder)
			return (<PDFViewer width={'100%'} height={700}>{workOrderDocumentContainer(data)}</PDFViewer>);
		else
			return null;
	}

	function onSelectionChanged({ selectedRowsData }) {
		const data = selectedRowsData[0];
		setSelectedWorkOrderNo(data && data.TKT_NO);
	}

	return (
		<div className="content">
			<div className="row">
				<div className="col">
					<div style={{display: 'none'}}>
						<img id="barcode" alt='' />
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="row g-3 align-items-center">
						<div className="col-auto">
							<label htmlFor="inputInvoiceNo" className="col-form-label">Work order #</label>
						</div>
						<div className="col-auto">
							<input type="text" id="inputInvoiceNo" className="form-control" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
						</div>
						<div className="col-auto">
							<span onClick={ async () => await fetchInvoice() } style={{cursor: 'pointer'}} title="Click to search an invoice.">
								<UilSearchAlt size="20" color="#61DAFB" />
							</span>
						</div>
						<div className="col-auto">
							<span onClick={ async () => await showInvoiceList() } style={{cursor: 'pointer'}} title="Show the list of workOrders." >
								<UilListUl size="20" color="#61DAFB" />
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">{showTheInvoice()}</div>
			</div>
			<div className="row">
				<div className="col">
					 <Popup
						visible={popupVisible}
						//onHiding={this.hideInfo}
						dragEnabled={false}
						hideOnOutsideClick={true}
						showCloseButton={false}
						showTitle={true}
						// title="Select"
						container=".dx-viewport"
						width={900}
						height={640}>
						<ToolbarItem
							widget="dxButton"
							toolbar="bottom"
							location="after"
							options={selectButtonOptions}
						/>
						<ToolbarItem
							widget="dxButton"
							toolbar="bottom"
							location="after"
							options={closeButtonOptions}
						/>
						<DataGrid dataSource={workOrders} columnAutoWidth={true} onSelectionChanged={onSelectionChanged}>
							<Column dataField="TKT_NO" caption="Work order #" />
							<Column dataField="TKT_DAT" dataType="date" caption="Date" />
							{/*<Column dataField="CUST_NO" caption="Customer #" />*/}
							<Column dataField="BILL_NAM" caption="Customer Name" />
							{/*<Column dataField="NOTE_TXT" caption="Note" />*/}
							<Column dataField="BILL_PHONE_1" caption="Phone" />
							<Column dataField="USR_LIC_PLATE" caption="Plate #" />
							<Selection mode="single" />
							<FilterRow visible={true} />
							<SearchPanel visible={true} />
							<Paging defaultPageSize={10} defaultPageIndex={1} />
						</DataGrid>
					</Popup>
				</div>
			</div>
		</div>
	)
}