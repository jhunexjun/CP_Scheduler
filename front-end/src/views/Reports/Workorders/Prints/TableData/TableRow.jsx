import { View, Text, StyleSheet } from '@react-pdf/renderer';

// import { modifyReason } from '../../../Reports/Workorders/OrderList/ModifyReasonData';
import { modifyReason } from '../../OrderList/ModifyReasonData';

let styles = StyleSheet.create({
  tableStyle: {
    borderRight: 0.5,
    borderLeft: 0.5,
    width: '90%',
    padding: 2,
  },
  tableHeaders: {
    flexDirection: 'row',
  },
  text: { color: '#696969', },
  text2: { color: '#696969', }
});


const TableRow = (props) => {
  // if (!props.hasOwnProperty('table'))
  //   return null;

  if (props.table === undefined)  // if it's the default value. We assume it's the default value.
    return null;

  function getReason(tableItem) {
    const foundReason = modifyReason[modifyReason.map(item => item.id).indexOf(tableItem.reasonId)];
    return foundReason ? foundReason.descr : '';
  }

  function showReason(item) {
    if (getReason(item) === '')
      return;

    return (<Text style={{color: 'red'}}>
            { ' [' + getReason(item) + ']' }
           </Text>)
  }

  const rows = props.table.map((item, index) => {
    if (props.table.length === index + 1)
      styles.tableStyle.borderBottom = 0.5;

    //let localStyle = {};

    // if ((item.newQty !== null)
    //     && parseFloat(item.newQty) !== NaN
    //     && (parseFloat(item.SalesQty) > parseFloat(item.newQty ?? item.SalesQty))
    //   ) {
    //     localStyle.textDecoration = 'line-through';
    //     localStyle.color = 'red';
    //   }

    let markup = <View style={styles.tableStyle} key={ index + 1 }>
          <View style={styles.tableHeaders}>
            <Text style={[{width: 30}, styles.text2]}>{ index + 1 }</Text>
            <Text style={[{width: 80}, styles.text2]}>{ item.ITEM_NO }</Text>
            <Text style={[{width: 300}, styles.text2]}>
              { item.DESCR }
              { showReason(item) }
            </Text>
            <Text style={[{width: 50, textAlign: 'right'}, styles.text2]}>{ (item.ITEM_TYP === 'S') ? item.hours.toFixed(2) : '' }</Text>
            <Text style={[{width: 50, textAlign: 'right'}]}>{ item.SalesQty }</Text>
            <Text style={[{width: 50, textAlign: 'right'}, styles.text2]}>{ item.newQty }</Text>
          </View>
        </View>;

    return markup;
  });

  return (<>{rows}</>);
};

export default TableRow;