import { View, Text, StyleSheet, Image, } from '@react-pdf/renderer';

import moment from 'moment';

const styles = StyleSheet.create({
  common: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 3,
    height: 140,
  },
  workOrderMeta: {
    flexDirection: 'column',
    // color: '#696969',
  },
  tktNoLabelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    fontWeight: 'ultrabold',
    fontSize: 9,
  },
  woLabelContainer: {borderWidth: 0, flexDirection: 'row', justifyContent: 'center', marginBottom: 3, backgroundColor: 'black'},
  textValue: {color: '#696969'}
});


const InvHeaderAddress = (props) => {
  if (!props.hasOwnProperty('table'))
    return null;

  return (
    <View>
      <View style={styles.woLabelContainer}>
        <Text style={{padding: 1, color: 'white', fontSize: 10}}>WORKORDER</Text>
      </View>
      <View style={styles.common}>
        <View style={styles.tktNoLabelContainer}>
          <Text>{props.table[0].TKT_NO}</Text>
        </View>
        <Image src={() => props.barcode.base64} style={{width:'100px', height: '20px'}} />
        <View style={{flexDirection: 'column'}}>
          <View style={styles.workOrderMeta}>
            <Text style={{marginTop: 10}}>Invoice Date:
              <Text style={styles.textValue}> {moment(props.table[0].TKT_DAT).format('MM/DD/YYYY')}</Text>
            </Text>
            <Text>Due Date:
              <Text style={styles.textValue}> {props.table[0].SHIP_DAT}</Text>
            </Text>
            <Text>Terms:
              <Text style={styles.textValue}> {props.table[0].TERMS_COD}</Text>
            </Text>
            <Text>Account:
              <Text style={styles.textValue}> {props.table[0].CUST_NO}</Text>
            </Text>
            <Text>PO:
              <Text style={styles.textValue}> {props.table[0].CUST_PO_NO}</Text>
            </Text>
            <Text>Ship Method:
              <Text style={styles.textValue}> {props.table[0].SHIP_VIA_COD}</Text>
            </Text>
            <Text>Sales rep:
              <Text style={styles.textValue}> {props.table[0].SLS_REP}</Text>
            </Text>
            <Text style={{marginBottom: 10}}>Ref:
              <Text style={styles.textValue}> </Text>
            </Text>
            <Text>Date/time:
              <Text style={styles.textValue}> {moment(new Date()).format('MM/DD/YYYY h:mm A')}</Text>
            </Text>
            <Text render={({ pageNumber, totalPages }) => (
              `Page ${pageNumber} of ${totalPages}`
            )} fixed />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvHeaderAddress;