import {
	Document,
	Page,
	StyleSheet,
} from "@react-pdf/renderer";

import InvoiceHeadersContent from './InvoiceHeadersContent';


const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		margin: 25,
		fontSize: 7,
	}
});


const invoiceDocumentContainer = (
	<Document>
		<Page size="A4" style={styles.page}>
			<InvoiceHeadersContent />
		</Page>
	</Document>
);

export default invoiceDocumentContainer