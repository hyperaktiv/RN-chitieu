import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ScrollView,
   TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderSection from '../components/HeaderSection';
import StatisticItem from '../components/StatisticItem';
import { BottomSheet } from 'react-native-btr';
import { _calInOutCome, formatMoney, getUniqueYear, _getDataOfMonth } from '../utils/utils';

import realm, { queryAllExpenses, queryAllBugets } from '../../database/allSchemas';

class StatisticsScreen extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         year: new Date().getFullYear(),
         listYearSelect: [{ key: 1, year: new Date().getFullYear() }],
         visibleBottomSheet: false,
         totalBuget: 0,
         totalExpense: 0,
         totalIncome: 0,
         listAllExpense: [],
         listAllMonthlyBuget: []
      }

      this._getAllExpense();
      this._getAllMonthlyBuget();

      this._changeYear = this._changeYear.bind(this);
   }
   // bottomsheet
   toggleBottomNavigationView = () => {
      this.setState({
         visibleBottomSheet: !this.state.visibleBottomSheet
      })
   }

   _getAllExpense = () => {
      queryAllExpenses().then((listExpenses) => {
         if (listExpenses.length !== 0) {

            // get all the unique year in list expense
            let listYear = getUniqueYear(listExpenses, "datetime");
            listYear = listYear.map((item) => {
               return { key: Math.floor(Date.now() / 1000), year: item };
            });

            // filter the expense in 2020
            let thisYearExpense = listExpenses.filter((record) => {
               return new Date(record.datetime).getFullYear() === this.state.year;
            });
            let calcTotalExpense = _calInOutCome(thisYearExpense, "expense");
            let calcTotalIncome = _calInOutCome(thisYearExpense, "income");

            this.setState({
               listYearSelect: listYear,
               listAllExpense: thisYearExpense,
               totalExpense: calcTotalExpense,
               totalIncome: calcTotalIncome
            });
         }
      }).catch((error) => {
         this.setState({ listAllExpense: [] });
      });
   }

   _getAllMonthlyBuget = () => {
      queryAllBugets().then((listBugets) => {
         if (listBugets.length !== 0) {

            let thisYearBuget = listBugets.filter((record) => {

               let currYear = new Date(record.month).getFullYear();
               if (Number.isNaN(currYear))
                  currYear = 2021

               return currYear === this.state.year;
            });
            let calcTotalBuget = thisYearBuget.reduce((acc, curr) => {
               return acc + curr.buget
            }, 0);
            // console.log("calcTotalBuget: " + JSON.stringify(this.state.year))
            this.setState({
               listAllMonthlyBuget: thisYearBuget,
               totalBuget: calcTotalBuget
            });
         }
      }).catch((error) => {
         // console.log(error)
         this.setState({ listAllMonthlyBuget: [] });
      });
   }

   _changeYear = (year) => {
      this._getAllExpense();
      this._getAllMonthlyBuget();

      this.setState({
         year: year
      });

   }

   _calcMonthBuget = (month) => {
      let thisMonth = `${this.state.year}-${month}`;
      let getBuget = this.state.listAllMonthlyBuget.filter(item => item.month === thisMonth);
      if (getBuget[0] !== undefined)
         return getBuget[0].buget;
      return 0;
   }
   _calcMonthInOut = (month, category) => {
      let thisMonth = `${this.state.year}-${month}`;
      let monthData = _getDataOfMonth(thisMonth, this.state.listAllExpense);

      let moneyOfMonth = _calInOutCome(monthData, category);
      return moneyOfMonth;
   }

   render() {
      const { totalBuget, totalExpense, totalIncome, listYearSelect, listAllExpense, year } = this.state;
      let remain = totalBuget - totalExpense + totalIncome;
      // console.log(JSON.stringify(totalBuget));
      return (
         <View style={{ flex: 1 }}>
            <HeaderSection title="Thống kê" />
            <View style={{ flexDirection: 'row', paddingVertical: 5, marginTop: 10 }}>

               {/**bottom sheet */}
               <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={this.toggleBottomNavigationView}
                     style={{
                        marginTop: 10,
                        width: '65%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 10,
                        borderColor: '#e4e6eb',
                        borderWidth: 1,
                        backgroundColor: '#e04c11'
                     }}>
                     <Text style={{ fontSize: 18, color: '#fff' }}>{this.state.year}</Text>
                  </TouchableOpacity>
                  <BottomSheet
                     visible={this.state.visibleBottomSheet}
                     onBackButtonPress={this.toggleBottomNavigationView}
                     onBackdropPress={this.toggleBottomNavigationView}>
                     <View style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        height: 250,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderWidth: 1,
                     }}>
                        <View style={{
                           flexDirection: 'column',
                           flex: 1,
                           width: '100%',
                           paddingHorizontal: 20,
                        }}>
                           <Text style={{
                              textAlign: 'center',
                              padding: 20,
                              fontSize: 20,
                              borderBottomWidth: 1,
                              borderColor: 'gray'
                           }}>Chọn danh mục</Text>
                           <ScrollView style={{ flex: 1 }}>
                              {listYearSelect &&
                                 listYearSelect.map((record) => (
                                    <TouchableOpacity
                                       key={record.year.toString()}
                                       style={{
                                          flexDirection: 'row',
                                          height: 40,
                                       }}
                                       onPress={() => {
                                          this._changeYear(record.year);
                                          this.toggleBottomNavigationView();
                                       }}>
                                       <View style={{
                                          flex: 1,
                                          borderColor: 'gray',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                       }}>
                                          <Icon name='calendar' size={26} />
                                       </View>
                                       <View style={{
                                          flex: 1,
                                          borderColor: 'gray',
                                          justifyContent: 'center',
                                       }}>
                                          <Text style={{ fontSize: 20 }}>{record.year}</Text>
                                       </View>
                                    </TouchableOpacity>
                                 ))}
                           </ScrollView>
                        </View>
                     </View>
                  </BottomSheet>
               </View>

               {/**Total modal */}
               <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row', }}>
                     <View style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16, textAlign: 'right', paddingRight: 15, fontWeight: 'bold' }}>
                           Tổng ngân sách:</Text>
                     </View>
                     <View style={{ flex: 2, }}>
                        <Text style={{ fontSize: 16 }}>{formatMoney(totalBuget)}</Text>
                     </View>
                  </View>

                  <View style={{ flexDirection: 'row', }}>
                     <View style={{ flex: 3, }}>
                        <Text style={{ fontSize: 16, textAlign: 'right', paddingRight: 15, fontWeight: 'bold' }}>
                           Tổng chi:</Text>
                     </View>
                     <View style={{ flex: 2, }}>
                        <Text style={{ fontSize: 16 }}>{formatMoney(totalExpense)}</Text>
                     </View>
                  </View>

                  <View style={{ flexDirection: 'row', }}>
                     <View style={{ flex: 3, }}>
                        <Text style={{ fontSize: 16, textAlign: 'right', paddingRight: 15, fontWeight: 'bold' }}>
                           Tổng thu:</Text>
                     </View>
                     <View style={{ flex: 2, }}>
                        <Text style={{ fontSize: 16 }}>{formatMoney(totalIncome)}</Text>
                     </View>
                  </View>

                  <View style={{ flexDirection: 'row', }}>
                     <View style={{ flex: 3, }}>
                        <Text style={{ fontSize: 16, textAlign: 'right', paddingRight: 15, fontWeight: 'bold' }}>
                           Số dư:</Text>
                     </View>
                     <View style={{ flex: 2, }}>
                        <Text style={{ fontSize: 16 }}>{formatMoney(remain)}</Text>
                     </View>
                  </View>
               </View>

            </View>

            <View style={{
               alignSelf: 'stretch',
               flexDirection: 'row',
               paddingVertical: 10,
               borderWidth: 1,
               borderColor: '#1D1E2C',
               marginVertical: 5,
               backgroundColor: '#CDCCCC'
            }}>
               <View style={styles.tableColumn}>
                  <Text style={styles.colText}>Tháng</Text>
               </View>
               <View style={styles.tableColumn}>
                  <Text style={styles.colText}>Ngân sách</Text>
               </View>
               <View style={styles.tableColumn}>
                  <Text style={styles.colText}>Chi tiêu</Text>
               </View>
               <View style={styles.tableColumn}>
                  <Text style={styles.colText}>Thu nhập</Text>
               </View>
               <View style={styles.tableColumn}>
                  <Text style={styles.colText}>Số dư</Text>
               </View>
            </View>

            {
               listAllExpense.length !== 0 && (
                  <ScrollView>
                     <StatisticItem month={"12"} year={year}
                        monthBuget={this._calcMonthBuget("12", "expense")}
                        expenseMoney={this._calcMonthInOut("12", "expense")}
                        incomeMoney={this._calcMonthInOut("12", "income")} />
                     <StatisticItem month={"11"} year={year}
                        monthBuget={this._calcMonthBuget("11", "expense")}
                        expenseMoney={this._calcMonthInOut("11", "expense")}
                        incomeMoney={this._calcMonthInOut("11", "income")} />
                     <StatisticItem month={"10"} year={year}
                        monthBuget={this._calcMonthBuget("10", "expense")}
                        expenseMoney={this._calcMonthInOut("10", "expense")}
                        incomeMoney={this._calcMonthInOut("10", "income")} />
                     <StatisticItem month={"9"} year={year}
                        monthBuget={this._calcMonthBuget("9", "expense")}
                        expenseMoney={this._calcMonthInOut("9", "expense")}
                        incomeMoney={this._calcMonthInOut("9", "income")} />
                     <StatisticItem month={"8"} year={year}
                        monthBuget={this._calcMonthBuget("8", "expense")}
                        expenseMoney={this._calcMonthInOut("8", "expense")}
                        incomeMoney={this._calcMonthInOut("8", "income")} />
                     <StatisticItem month={"7"} year={year}
                        monthBuget={this._calcMonthBuget("7", "expense")}
                        expenseMoney={this._calcMonthInOut("7", "expense")}
                        incomeMoney={this._calcMonthInOut("7", "income")} />
                     <StatisticItem month={"6"} year={year}
                        monthBuget={this._calcMonthBuget("6", "expense")}
                        expenseMoney={this._calcMonthInOut("6", "expense")}
                        incomeMoney={this._calcMonthInOut("6", "income")} />
                     <StatisticItem month={"5"} year={year}
                        monthBuget={this._calcMonthBuget("5", "expense")}
                        expenseMoney={this._calcMonthInOut("5", "expense")}
                        incomeMoney={this._calcMonthInOut("5", "income")} />
                     <StatisticItem month={"4"} year={year}
                        monthBuget={this._calcMonthBuget("4", "expense")}
                        expenseMoney={this._calcMonthInOut("4", "expense")}
                        incomeMoney={this._calcMonthInOut("4", "income")} />
                     <StatisticItem month={"3"} year={year}
                        monthBuget={this._calcMonthBuget("3", "expense")}
                        expenseMoney={this._calcMonthInOut("3", "expense")}
                        incomeMoney={this._calcMonthInOut("3", "income")} />
                     <StatisticItem month={"2"} year={year}
                        monthBuget={this._calcMonthBuget("2", "expense")}
                        expenseMoney={this._calcMonthInOut("2", "expense")}
                        incomeMoney={this._calcMonthInOut("2", "income")} />
                     <StatisticItem month={"1"} year={year}
                        monthBuget={this._calcMonthBuget("1", "expense")}
                        expenseMoney={this._calcMonthInOut("1", "expense")}
                        incomeMoney={this._calcMonthInOut("1", "income")} />
                  </ScrollView>
               )
            }

         </View >
      );
   }
}

const styles = StyleSheet.create({
   yearButton: {
      flexDirection: 'row',
      width: 80,
      height: 40,
      borderRadius: 15,
      borderWidth: 1,
      backgroundColor: 'blue',
      justifyContent: 'space-around',
      alignItems: 'center',
      top: 10,
      left: 10,
   },
   text: {
      fontSize: 16,
   },
   colText: {
      fontSize: 13,
      fontWeight: 'bold'
   },
   tableColumn: {
      marginVertical: 5,
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
   },
});
export default StatisticsScreen;