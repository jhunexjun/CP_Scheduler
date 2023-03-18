import { View, Image, Text, StyleSheet } from '@react-pdf/renderer';

import logo from '../../assets/compuTant/img/total-offroad-more-transparent.png';
import InvHeaderAddrsFrom from './InvHeaderAddrsFrom';
import InvBillingAndInvoiceAddrs from './InvBillingAndInvoiceAddrs';
import InvVehicleInfo from './InvVehicleInfo';
import InvWorkOrderMeta from './InvWorkOrderMeta';


const styles = StyleSheet.create({
	common: {
		marginRight: 5,
	},
	logo: {
		width: 150,
		height: 55,
		margin: 10,
	},
	addresses: {
		flexDirection: 'row',
		// borderWidth: 0.5
	},
});


const InvoiceHeadersContent = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={[styles.addresses, styles.common]}>
			<View style={{flexDirection: 'column'}}>
				<View style={{flexDirection: 'row'}}>
					<Image src={logo} style={styles.logo} />
					<InvHeaderAddrsFrom />
				</View>

				<InvBillingAndInvoiceAddrs />
			</View>
		</View>

		<InvVehicleInfo />
		<InvWorkOrderMeta />
	</View>
);

export default InvoiceHeadersContent