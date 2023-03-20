import React, { createContext } from "react";
import ReactDOM from "react-dom";

import { PDFViewer } from '@react-pdf/renderer';
import invoiceDocumentContainer from './Invoice/InvoiceDocumentContainer';


const data = {
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
	}

const dataContext = createContext(data);

export default () => {
	

	return (
		<div className="content">
			<div className="row">
				<div className="col">
					<PDFViewer width={'100%'} height={700}>{invoiceDocumentContainer(data)}</PDFViewer>
				</div>
			</div>
		</div>
	)
}