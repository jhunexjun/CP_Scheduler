import { View, Image, StyleSheet } from '@react-pdf/renderer';

// import logo from '../../../../assets/compuTant/img/pos_highway_green.png';
import logo from '../../../../assets/compuTant/img/POS Highway - CompuTant Logo Black.png';
import HeaderAddrsFrom from './HeaderAddrsFrom';
import BillingAndWorkOrderAddrs from './BillingAndWorkOrderAddrs';
import VehicleInfo from './VehicleInfo';
import WorkOrderMeta from './WorkOrderMeta';


const styles = StyleSheet.create({
  common: {
    marginRight: 5,
  },
  logo: {
    width: 220,
    height: 45,
    marginBottom: 3,
    marginRight: 3
  },
  addresses: {
    flexDirection: 'row',
  },
});


const WorkOrderHeadersContent = (props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.addresses, styles.common]}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'column'}}>
              <Image src={logo} style={styles.logo} />
              <HeaderAddrsFrom />
            </View>

            <BillingAndWorkOrderAddrs {...props} />
          </View>
        </View>

        <VehicleInfo {...props} />
        <WorkOrderMeta {...props} />
      </View>
    </View>
  )
}

export default WorkOrderHeadersContent