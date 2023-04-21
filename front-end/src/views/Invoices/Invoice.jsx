import { /*createContext,*/ useState, useCallback, } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { PDFViewer } from '@react-pdf/renderer';
import invoiceDocumentContainer from './Invoice/InvoiceDocumentContainer';

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

// const dataContext = createContext(data);

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
	const [invoiceNo, setInvoiceNo] = useState('');
	const { sessionId } = useParams();
	const [data, setData] = useState(defaultData);
	const [popupVisible, setPopupVisible] = useState(false);
	const navigate = useNavigate();
	const [invoices, setInvoices] = useState([]);

	// let dataGridData = [{fName: 'Jhun', lName: 'Morcilla', Profession: 'Software Engineer'}];

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
				}
			});
	}, []);

	const fetchSms = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/invoiceslist?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setInvoices(res.data);
			});
	}, []);

	function getImgBase64String(value) {
		const barcodeNode = document.getElementById('barcode');
		JsBarcode(barcodeNode, value, {displayValue: false});
		return barcodeNode.src;
	}

	async function fetchInvoice() {
		await fetchInvoiceData(invoiceNo);
	}

	let closeButtonOptions = {
		text: 'Close',
		onClick: hideInfo,
	}

	function hideInfo() {
		setPopupVisible(false);
	}

	async function showInvoiceList() {
		setPopupVisible(true);
		await fetchSms();
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
							<label htmlFor="inputInvoiceNo" className="col-form-label">Invoice no</label>
						</div>
						<div className="col-auto">
							<input type="text" id="inputInvoiceNo" className="form-control" onChange={(e) => setInvoiceNo(e.target.value)} />
						</div>
						<div className="col-auto">
							<span onClick={ async () => await fetchInvoice() } style={{cursor: 'pointer'}} title="Click to search an invoice.">
								<UilSearchAlt size="20" color="#61DAFB" />
							</span>
						</div>
						<div className="col-auto">
							<span onClick={ async () => await showInvoiceList() } style={{cursor: 'pointer'}} title="Show the list of invoices." >
								<UilListUl size="20" color="#61DAFB" />
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<PDFViewer width={'100%'} height={700}>{invoiceDocumentContainer(data)}</PDFViewer>
				</div>
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
						title="Information"
						container=".dx-viewport"
						width={750}
						height={550}>
						<ToolbarItem
							widget="dxButton"
							toolbar="bottom"
							location="after"
							options={closeButtonOptions}
						/>
						<DataGrid dataSource={invoices} columnAutoWidth={true}>
							<Column dataField="TKT_NO" caption="Ticket #" />
							<Column dataField="TKT_DAT" dataType="date" caption="Invoice Date" />
							{/*<Column dataField="CUST_NO" caption="Customer #" />*/}
							<Column dataField="BILL_NAM" caption="Customer Name" />
							<Column dataField="NOTE_TXT" caption="Note" />
							<Selection mode="single" />
							<FilterRow visible={true} />
							<SearchPanel visible={true} />
							<Paging defaultPageSize={8} defaultPageIndex={1} />
						</DataGrid>
					</Popup>
				</div>
			</div>
		</div>
	)
}
