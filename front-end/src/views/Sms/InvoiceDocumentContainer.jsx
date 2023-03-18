import {
	Document,
	Page,
	StyleSheet,
} from "@react-pdf/renderer";

import InvoiceHeadersContainer from './InvoiceHeadersContainer';


const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		margin: 10
	}
});


const invoiceDocumentContainer = (
	<Document>
		<Page size="A4" style={styles.page}>
			<InvoiceHeadersContainer />
		</Page>
	</Document>
);

export default invoiceDocumentContainer