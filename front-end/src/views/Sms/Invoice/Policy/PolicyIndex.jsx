import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	policyStyle: {
		flexDirection: 'column',
		width: '87.3%',
		marginTop: 6,
		marginBottom: 3,
		padding: 3,
	},
	textHighlight: { marginTop: 8 },
	text: { color: '#696969', },
});


const PolicyIndex = (props) => (
	<View style={styles.policyStyle}>
		<View style={{flexDirection: 'row'}}>
			<Text>Cash Refund Policy: </Text>
			<Text style={styles.text}>Cash Payments are subject to a check refund.</Text>
		</View>
		<Text style={styles.textHighlight}>Take off Parts Disclaimer:
			<Text style={styles.text}>Thank you for your purchase, please be advised that we will not be responsible for take off parts after 72 hours of purchase.
				All parts are new unless otherwise stated. Parts and Labor are not warrantied unless otherwise specified.</Text>
		</Text>
		<Text style={styles.text}>
			To comply with Federal, State and Local laws and statutes, some charges on your order are automatically calculated and added to your order based on the
			product you purchased. Fees such as core charges, disposal fees (tires, batteries and oil), federal excise taxes and others may be included on your order
			and described above.
		</Text>
		<Text style={styles.textHighlight}>WARNING TO DRIVER:
			<Text style={styles.text}> This vehicle has been modified to enhance off-road performance and has unique handling characteristics. Because of the higher
				center of gravity and/or larger tires and wheels, this vehicle may have a higher risk of rollover, and handles and reacts differently than your stock vehicle ,
				both on and off road. Extreme care should be taken to prevent vehicle rollover or loss of control which can result in serious injury or death. Avoid sudden
				sharp turns or abrupt maneuvers. Slow down. Be sure to get comfortable with your newly modified vehicle.
			</Text>
		</Text>
		<Text style={styles.textHighlight}>IMPORTANT MAINTENANCE INFORMATION:
			<Text style={styles.text}> It is the customer’s sole responsibility to have all nuts and bolts re-checked for tightness and proper fitment
				within 10 days after delivery, and then every 3,000 miles thereafter. Please return your vehicles to any Total Off-Road location so this can be done for you
				free of charge. Also, wheel alignment and steering, suspension and driveline systems should be inspected by a qualified mechanic at least every 3,000
				miles. These maintenance procedures are critical for your safety and the safety of the people around you. Failure to do so can result in severe injury or
				death.
			</Text>
		</Text>
	</View>
);

export default PolicyIndex;