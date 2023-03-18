import React from "react";
import ReactDOM from "react-dom";
import {
	BlobProvider,
	Document,
	Page,
	StyleSheet,
	Text,
	View,
	Image,
} from "@react-pdf/renderer";

import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
		// backgroundColor: "#E4E4E4"
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
		// color: 'white'
	},
	logo: {
		width: 140,
		height: 50,

	}
});

// Create Document Component
const MyDocument = (
	<Document>
		<Page size="A4" style={styles.page}>
			
		</Page>
	</Document>
);

export default function USRPdfViewer() {
	return (
		// <BlobProvider document={MyDocument}>
		// 	{({ blob, url, loading, error }) => {
		// 		if (blob) {
		// 			return <PSPDFKit blob={blob} />;
		// 		}

		// 		if (error) {
		// 			return error;
		// 		}

		// 		return <div>The PDF is rendering...</div>;
		// 	}}
		// </BlobProvider>

		<PDFViewer width={'100%'} height={700}>{MyDocument}</PDFViewer>
	);
}