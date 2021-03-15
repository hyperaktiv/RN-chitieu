import React, { useState } from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Text,
   Platform,
   ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ExpenseComponent from '../../components/HomeTab/ExpenseComponent';
import { convertDate, } from '../../utils/utils';
import realm, { queryAllExpenses } from '../../../database/allSchemas';


class SearchingScreen extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         date: new Date(),
         mode: 'date',
         show: false,

         expenseFound: [],
         listAllExpense: []
      }


      this._getListDate();
   }

   _getListDate = () => {
      queryAllExpenses().then((listExpenses) => {
         if (listExpenses.length !== 0) {
            this.setState({
               listAllExpense: listExpenses
            });
         }
      }).catch((error) => {
         this.setState({ listAllExpense: [] });
      });
   }

   onChange = (event, selectedDate) => {
      let { date, listAllExpense } = this.state;
      const thisDate = selectedDate || date;
      let searchResult = listAllExpense.filter(record => new Date(record.date).toDateString() === new Date(thisDate).toDateString());

      this.setState({
         show: Platform.OS === 'ios',
         date: thisDate,

         expenseFound: searchResult
      });
   };

   showDatepicker = () => {
      this.setState({ show: true });
   }

   render() {
      const { date, mode, show, expenseFound } = this.state;
      const { navigation } = this.props;
      // console.log(navigation)
      // console.log(JSON.stringify(expenseFound));
      return (
         <View
            style={{
               flex: 1,
               paddingTop: 5,
            }}>
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#CED0CE',
               }}>
               <TouchableOpacity style={{
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
               }} onPress={this.showDatepicker}>
                  <Text
                     style={{
                        backgroundColor: '#fc820a',
                        width: 190,
                        paddingVertical: 12,
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 20,
                        fontSize: 18,
                        height: 50,
                        color: 'black'
                     }}>
                     {convertDate(date.toDateString())}
                  </Text>
               </TouchableOpacity>

               {show && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={date}
                     mode={mode}
                     is24Hour={true}
                     display="default"
                     onChange={this.onChange}
                  />
               )}
            </View>

            <View style={{ padding: 10 }}>
               <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>Kết quả:</Text>

               <ScrollView style={{ borderWidth: 1, borderColor: '#CED0CE', paddingHorizontal: 10, marginVertical: 10 }}>
                  {expenseFound.length !== 0 &&
                     expenseFound.map(record => {
                        return <View style={{ flex: 1 }} key={record.id}>
                           <ExpenseComponent navigation={navigation} data={record} key={record.id} />
                           <View style={{ height: 1, backgroundColor: "#CED0CE", marginHorizontal: 10 }} />
                        </View>
                     })
                  }

               </ScrollView>
            </View>
         </View>
      );
   }
}
export default SearchingScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
   },
});