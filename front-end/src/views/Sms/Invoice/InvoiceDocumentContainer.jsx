import {
	Document,
	Page,
	StyleSheet,
} from "@react-pdf/renderer";

import HeadersContent from './Header/HeadersContent';
import TableIndex from './TableData/TableIndex';


const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		margin: 25,
		fontSize: 7,
	}
});


const invoiceDocumentContainer = (props) => {


	return (
		<Document>
			<Page size='LETTER' style={styles.page}>
				<HeadersContent />
				<TableIndex {...props} />
			</Page>
		</Document>
	);
}

export default invoiceDocumentContainer