import { View, Image, StyleSheet } from '@react-pdf/renderer';

import logo from '../../../../assets/compuTant/img/total-offroad-more-transparent.png';
import HeaderAddrsFrom from './HeaderAddrsFrom';
import BillingAndInvoiceAddrs from './BillingAndInvoiceAddrs';
import VehicleInfo from './VehicleInfo';
import WorkOrderMeta from './WorkOrderMeta';


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
	},
});


const InvoiceHeadersContent = (props) => (
	<View style={{flexDirection: 'column'}}>
		<View style={{flexDirection: 'row'}}>
			<View style={[styles.addresses, styles.common]}>
				<View style={{flexDirection: 'column'}}>
					<View style={{flexDirection: 'row'}}>
						<Image src={logo} style={styles.logo} />
						<HeaderAddrsFrom />
					</View>

					<BillingAndInvoiceAddrs {...props} />
				</View>
			</View>

			<VehicleInfo {...props} />
			<WorkOrderMeta {...props} />
		</View>
	</View>
);

export default InvoiceHeadersContent