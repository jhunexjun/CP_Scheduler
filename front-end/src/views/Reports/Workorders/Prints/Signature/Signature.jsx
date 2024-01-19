import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

import { formatDateMMddYYYY } from '../../../../../utils/util';

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
  },
  signature: {
    position: 'relative',
    top: '-30px',
    left: '-260px',
  },
  signDate: {
    position: 'relative',
    right: '100px',
  },
  dateSigned: {
    position: 'relative',
    top: '-10px',
    left: '-50px',
  }
});


const Signature = (props) => {
  if (props.signature === undefined)
    return null;

  return <View style={styles.footer} fixed>
          <View style={{flexDirection: 'row'}}>
            <Text style={{paddingRight: 70}}>Signature X: __________________________________________________</Text>
            <View style={styles.signature}>
              <Image src={() => props.signature.signature} style={{width:'200px', height: '50px'}} />
            </View>
            <View>
              <Text style={styles.signDate}>Date X: _____________________</Text>
              <View style={styles.dateSigned}>
                <Text>{formatDateMMddYYYY(props.signature.dateSigned)}</Text>
              </View>
            </View>
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