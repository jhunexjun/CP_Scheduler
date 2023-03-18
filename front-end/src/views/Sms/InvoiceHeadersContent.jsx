import { View, Image, StyleSheet } from '@react-pdf/renderer';

import logo from '../../assets/compuTant/img/total-offroad-more-transparent.png';
import InvHeaderAddFrom from './InvHeaderAddFrom';

const styles = StyleSheet.create({
	logo: {
		width: 150,
		height: 55,
		margin: 20,
	}
});


const InvoiceHeadersContent = () => (
	<View style={{flexDirection: 'row'}}>
		<Image src={logo} style={styles.logo} />
		<InvHeaderAddFrom />
	</View>
);

export default InvoiceHeadersContent