/* Note: JLM: Being used by Appointment and Workorders. So be careful in modifying. */

import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  workOrderCompanyName: {
    fontSize: 9,
    fontStyle: 'bold',
  },
});

const HeaderAddress = () => (
  <View style={[{flexDirection: 'column', marginBottom: '5px'}]}>
    <Text style={styles.workOrderCompanyName}>Total Off-Road & More Raleigh</Text>
    <Text>7109 Glenwood Ave.</Text>
    <Text>Raleigh, NC 27612</Text>
    <Text>(919) 571-8105</Text>
  </View>
);

export default HeaderAddress;