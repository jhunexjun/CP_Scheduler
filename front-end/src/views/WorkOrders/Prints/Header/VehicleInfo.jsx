import { View, Text, StyleSheet } from '@react-pdf/renderer';

import moment from 'moment';

const styles = StyleSheet.create({
  common: {
    marginRight: 5,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 3,
  },
  vehicleInfo: {
    flexDirection: 'column',
    width: 120,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'ultrabold'
  },
  text: { color: '#696969', },
});


const InvVehicleInfo = (props) => {
  if (!props.hasOwnProperty('table'))
    return null;

  return (
    <View style={[styles.vehicleInfo, styles.common]}>
      <Text style={styles.label}>Vehicle Information:</Text>
      <View>
        <Text>Year:
          <Text style={styles.text}> {props.table[0].USR_YR}</Text>
        </Text>
        <Text>Make:
          <Text style={styles.text}> {props.table[0].USR_MAKE}</Text>
        </Text>
        <Text>Model:
          <Text style={styles.text}> {props.table[0].USR_MODEL}</Text>
        </Text>
        <Text>Service Type:
          <Text style={styles.text}> {props.table[0].USR_SERVICE_TYP}</Text>
        </Text>
        <Text>VIN No:
          <Text style={styles.text}> {props.table[0].USR_VIN_NO}</Text>
        </Text>
        <Text>License:
          <Text style={styles.text}> {props.table[0].USR_LIC_PLATE}</Text>
        </Text>
        <Text>Exterior:
          <Text style={styles.text}> {props.table[0].USR_EXTERRIOR}</Text>
        </Text>
        <Text>Wheel lock:
          <Text style={styles.text}> {props.table[0].USR_WHEEL_LOCK}</Text>
        </Text>
        <Text>Appt Date:
          <Text style={styles.text}> {moment(props.table[0].USR_APPT_DAT).format('MM/DD/YYYY')}</Text>
        </Text>
        <Text>Odometer in:
          <Text style={styles.text}> {props.table[0].USR_ODOMETER_IN}</Text>
        </Text>
        <Text>Odometer out:
          <Text style={styles.text}> {props.table[0].USR_ODOMETER_OUT}</Text>
        </Text>
        <Text>Date/time in:
          <Text style={styles.text}>
            {moment(props.table[0].USR_SERVICE_IN_DAT).format('MM/DD/YYYY')} {` `}
            {moment(props.table[0].USR_SERVICE_IN_TIM).isValid() ? moment(props.table[0].USR_SERVICE_IN_TIM).format('h:mm A') : ''}
          </Text>
        </Text>
        <Text>Date/time out:
          <Text style={styles.text}>
            {moment(props.table[0].USR_SERVICE_OUT_DAT).format('MM/DD/YYYY')} {` `}
            {moment(props.table[0].USR_SERVICE_OUT_TIM).isValid() ? moment(props.table[0].USR_SERVICE_OUT_TIM).format('h:mm A') : ''}
          </Text>
        </Text>
        <Text>Retain parts?:
          <Text style={styles.text}> {props.table[0].USR_RETAIN_PARTS}</Text>
        </Text>
        <Text>Customer own parts:
          <Text style={styles.text}> {props.table[0].USR_CUSTOMER_OWN_PARTS}</Text>
        </Text>
      </View>
    </View>
  )
};

export default InvVehicleInfo;