import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	footer: {
		flexDirection: 'column',
		position: 'absolute',
		bottom: 80,
		left: 0,
		right: 0,
		textAlign: 'center',
	},
	message: {
		flexDirection: 'column',
		marginTop: 10,
		color: '#696969',
	}
});


const Signature = () => {
	return <View style={styles.footer} fixed>
				<View style={{flexDirection: 'row'}}>
					<Text style={{paddingRight: 70}}>Signature X: _____________________________________________________</Text>
					<Text>Date X: _________________________</Text>
				</View>
				<View style={styles.message}>
					<Text>Thank you for shopping at Total Offroad & More.</Text>
					<Text>Customers have 3 days from date of service to pick up parts removed!</Text>
					<Text>Please "LIKE" our Facebook page and leave pictures of your rig.</Text>
					<Text>Leave us a 5 STAR reveiw on Google.</Text>
				</View>
			</View>
}

export default Signature;