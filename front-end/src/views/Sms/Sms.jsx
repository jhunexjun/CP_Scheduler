import React, { createContext } from "react";
import ReactDOM from "react-dom";

import { PDFViewer } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import invoiceDocumentContainer from './Invoice/InvoiceDocumentContainer';


const html = `<html>
	<style>
		.my-heading4 {
			background: darkgreen;
			color: white;
		}
		pre {
			background-color: #eee;
			padding: 10px;
		}
	</style>
	<body>
		
		<h1>Heading 1</h1>
		<h2 style="background-color: pink">Heading 2</h2>
		<h3>Heading 3</h3>
		<h4 class="my-heading4">Heading 4</h4>
		<p>
		Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
		<s>strikethrough</s>,
		<strong><u><s><i>and all of the above</i></s></u></strong>
		</p>
		<p>
		Paragraph with image  and
		<a href="http://google.com">link</a>
		</p>
		<hr />
		<ul>
		<li>Unordered item</li>
		<li>Unordered item</li>
		</ul>
		<ol>
		<li>Ordered item</li>
		<li>Ordered item</li>
		</ol>
		<br /><br /><br /><br /><br />
		Text outside of any tags
		<table>
		<thead>
		<tr>
		<th>Column 1</th>
		<th>Column 2</th>
		<th>Column 3</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td>Foo</td>
		<td>Bar</td>
		<td>Foobar</td>
		</tr>
		<tr>
		<td colspan="2">Foo</td>
		<td>Bar</td>
		</tr>
		<tr>
		<td>Some longer thing</td>
		<td>Even more content than before!</td>
		<td>Even more content than before!</td>
		</tr>
		</tbody>
		</table>
		<div style="width: 200px; height: 200px; background: pink"></div>
		<pre>
		function myCode() {
		const foo = 'bar';
		}
		</pre>
	</body>
</html>
`;

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
				}]
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