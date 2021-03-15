import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
   Collapse,
   CollapseHeader,
   CollapseBody,
} from 'accordion-collapse-react-native';
import { _getDataOfMonth, convertDate } from '../utils/utils';
import { queryAllExpenses, getCurrentMonthBuget } from '../../database/allSchemas';


class StatisticItem extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isCollapse: false,
         listMonthExpense: [],
         monthBuget: 0
      }

      this._filterMonthExpenses();

      // this._getCurrenMonthBugget();
   }

   _filterMonthExpenses = () => {
      // console.log(this.props.year + '-' + this.props.month);
      let { month, year } = this.props;
      let thisMonth = year + '-' + month;

      queryAllExpenses().then((listExpenses) => {
         if (listExpenses.length !== 0) {

            let filterExpenses = _getDataOfMonth(thisMonth, listExpenses);
            // console.log(`${thisMonth}: ` + JSON.stringify(filterExpenses))

            this.setState({
               listMonthExpense: filterExpenses
            });
         }
      }).catch((error) => {
         this.setState({ listMonthExpense: [] });
      });

   }

   _getCurrenMonthBugget = () => {

      let { month, year } = this.props;
      let currentMonth = year + '-' + month;
      // console.log(currentMonth)

      getCurrentMonthBuget(currentMonth).then((bugetRecord) => {
         if (bugetRecord.length > 0) {
            this.setState({
               monthBuget: bugetRecord[0].buget
            });
            console.log(currentMonth, JSON.stringify(bugetRecord))
         }
      }).catch(error => {
         alert("Get buget error" + error);
         this.setState({
            monthBuget: 0
         });
      });
   }

   formatMoney = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
   };

   formatMoneyWithCategory = (num, category = '') => {
      let sign = '';
      if (category == 'income') sign = '+';
      else if (category == 'expense') sign = '-';
      return sign + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   }

   render() {
      const { month, monthBuget, expenseMoney, incomeMoney } = this.props;
      // const { monthBuget } = this.state;
      let remain = monthBuget - expenseMoney + incomeMoney;

      // let color = parseInt(month) % 2 !== 0 ? '#e4e6eb' : '#fff';
      // let border = parseInt(month) % 2 === 0 ? '#e4e6eb' : '#fff';

      return (
         <Collapse
            onToggle={() => {
               this.setState({
                  isCollapse: !this.state.isCollapse
               });

               if (this.state.isCollapse === true)
                  this._filterMonthExpenses();
            }}>
            <CollapseHeader>
               <View style={{
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#e4e6eb',
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  marginVertical: 5,
                  marginHorizontal: 5,
               }}>
                  <View style={styles.tableColumn}>
                     <Text style={{ fontSize: 13, color: 'red', fontWeight: 'bold' }} >Tháng {month}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                     <Text style={{ fontSize: 13, color: '#1D1E2C' }} >{this.formatMoney(monthBuget)}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                     <Text style={{ fontSize: 13, color: '#1D1E2C' }} >{this.formatMoney(expenseMoney)}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                     <Text style={{ fontSize: 13, color: '#1D1E2C' }} >{this.formatMoney(incomeMoney)}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                     <Text style={{ fontSize: 13, color: '#1D1E2C' }} >{this.formatMoney(remain)}</Text>
                  </View>
               </View>
               <View style={{
                  position: 'absolute',
                  borderWidth: 1,
                  backgroundColor: '#ececec',
                  bottom: '3%',
                  right: '3%',
                  borderColor: "#CED0CE",
               }}>
                  {this.state.isCollapse === true ? (
                     <Icon name="chevron-up" color="black" size={14} />
                  ) : (
                        <Icon name="chevron-down" color="black" size={14} />
                     )}
               </View>

            </CollapseHeader>
            <CollapseBody style={{
               marginHorizontal: 15,
               borderWidth: 1,
               borderColor: "#CED0CE",
               paddingHorizontal: 10
            }}>

               {this.state.listMonthExpense.length !== 0 &&
                  this.state.listMonthExpense.map((record) => (

                     <View style={{
                        flexDirection: 'row',
                        // marginVertical: 10,
                        alignItems: 'center',
                     }}
                        key={record.id}
                     >
                        <View style={{ width: 25, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                           <Icon name={record.icon} color="#900" size={14} />
                        </View>
                        <View style={{
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           flex: 1,
                        }}>
                           <View style={{
                              // flex: 5, 
                              flex: 2,
                              justifyContent: 'center'
                           }}>
                              <Text style={{ fontSize: 14, color: '#1D1E2C' }}>{record.name}</Text>
                           </View>

                           <View style={{ flex: 3, justifyContent: 'center' }}>
                              <Text style={{ fontSize: 14, color: '#1D1E2C' }}>{convertDate(record.datetime)}</Text>
                           </View>

                           <View style={{
                              flex: 2,
                              alignItems: 'flex-end'
                           }}>
                              <Text style={{
                                 fontSize: 14,
                                 // color: '#fc820a',
                                 color: record.category === 'income' ? '#fc820a' : '#1D1E2C'
                              }}>{this.formatMoneyWithCategory(record.money, record.category)}</Text>
                           </View>
                        </View>
                     </View>
                  ))
               }

            </CollapseBody>
         </Collapse>
      );
   }
}
const styles = StyleSheet.create({
   tableColumn: {
      marginVertical: 5,
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
   },
});
export default StatisticItem;