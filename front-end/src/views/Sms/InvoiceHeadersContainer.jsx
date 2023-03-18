import { Text, View, StyleSheet } from '@react-pdf/renderer';

import InvoiceHeadersContent from './InvoiceHeadersContent';

const styles = StyleSheet.create({
	flexDirection: 'row',
});


const invoiceHeadersContainer = () => (
	<View>
		<InvoiceHeadersContent />
	</View>
)


export default invoiceHeadersContainer;