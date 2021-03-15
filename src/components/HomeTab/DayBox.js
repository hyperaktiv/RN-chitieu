import * as React from 'react';
import {
   View,
   Text,
   StyleSheet,
} from 'react-native';

import ExpenseComponent from './ExpenseComponent';
import { convertDate, _getDataOfDay, _calInOutCome, formatMoney } from '../../utils/utils';

// import realm, { queryAllExpenses } from '../../../database/allSchemas';

class DayBox extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         listExpenses: this.props.listAllExpense
      };
   }

   render() {
      const { navigation, date } = this.props;
      let data = _getDataOfDay(this.props.date.item, this.state.listExpenses);
      return (
         <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
               <Text style={styles.leftSide}>
                  {convertDate(date.item)}
               </Text>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.rightSide}>Chi tiêu: {formatMoney(_calInOutCome(data, 'expense'))}</Text>
                  <Text style={{ fontSize: 12, marginLeft: 15 }}>Thu nhập: {formatMoney(_calInOutCome(data, 'income'))}</Text>
               </View>
            </View>
            <View style={{ paddingHorizontal: 15, flex: 1, paddingVertical: 10 }}>
               {data && data.map((record) => {
                  return <View style={{ flex: 1 }} key={record.id}>
                     <ExpenseComponent navigation={navigation} data={record} key={record.id} />
                     <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE", }} />
                  </View>
               })}
            </View>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   boxContainer: {
      borderWidth: 1,
      borderColor: "#CED0CE",
      marginTop: 10,
      marginHorizontal: 10,

      shadowColor: "#000",
      shadowOffset: {
         width: 2,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,

   },
   boxHeader: {
      borderBottomWidth: 1,
      borderColor: "#CED0CE",
      backgroundColor: '#DADCDE',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
   },
   rightSide: {
      fontSize: 12,
      marginLeft: 15,
   },
   leftSide: {
      fontSize: 12,
   },
});
export default DayBox;