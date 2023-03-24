import { /*createContext,*/ useState, useCallback, } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { PDFViewer } from '@react-pdf/renderer';
import invoiceDocumentContainer from './Invoice/InvoiceDocumentContainer';

import JsBarcode from 'jsbarcode';


const defaultData = {
			headers: {},
			table: {
				rows: [{
					itemNo: 'JH-52633',
					description: 'Tire',
					hours: 2.5,
					salesQty: 4,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'MIC 90000036818',
					description: 'Shock',
					hours: 3.45,
					salesQty: 1,
				},
				{
					itemNo: 'YWW-611GWOW',
					description: 'Headlight',
					hours: 1,
					salesQty: 2,
				},
				{
					itemNo: 'KEW-I2',
					description: 'Dashcam',
					hours: 1.5,
					salesQty: 1,
				},
				{
					itemNo: 'LW7-FAS5',
					description: 'Side mirror',
					hours: 1.8,
					salesQty: 2,
				},]
			},
			notes: [{
				id: 'note-22571',
				text: 'Replace all 4 tires.',
			}],
			data: {
				table: [
					{
						CUST_NO: "",
						TKT_NO: "",
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
						SHIP_NAM: "",
						SHIP_PHONE_1: "",
						SHIP_STATE: null,
						SHIP_ZIP_COD: null,
						shipAddress: "",
						hours: 0,
						SalesQty: 0,
						NOTE_DAT: "",
						NOTE_TXT: "",
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
				barcode: { base64: null },
			},
	}

// const dataContext = createContext(data);

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
	const [invoiceNo, setInvoiceNo] = useState('');
	const { sessionId } = useParams();
	const [data, setData] = useState(defaultData);
	const navigate = useNavigate();

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

	function getImgBase64String(value) {
		const barcodeNode = document.getElementById('barcode');
		JsBarcode(barcodeNode, value, {displayValue: false});
		return barcodeNode.src;
	}

	async function fetchInvoice() {
		await fetchInvoiceData(invoiceNo);
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
							<label htmlFor="inputInvoiceNo" className="col-form-label">Invoice no.</label>
						</div>
						<div className="col-auto">
							<input type="text" id="inputInvoiceNo" className="form-control" onChange={(e) => setInvoiceNo(e.target.value)} />
						</div>
						<div className="col-auto">
							<button type="button" className="btn btn-primary" onClick={ async () => await fetchInvoice() }>Search</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<PDFViewer width={'100%'} height={700}>{invoiceDocumentContainer(data)}</PDFViewer>
				</div>
			</div>
		</div>
	)
}
