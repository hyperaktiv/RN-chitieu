import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { _getDataOfMonth, _getCurrentBuget, formatMoney, _calMoneyOfCurrentMonth, _calInOutCome } from '../../utils/utils';

import { getCurrentMonthBuget, insertBugetItem, deleteAllBugets } from '../../../database/allSchemas';


const height = Dimensions.get("window").height;

class HomeHeader extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         thisMonthBuget: []
      }
      // thisMonthBuget: _getCurrentBuget(buget)

      this._getCurrenMonthBugget();
      // deleteAllBugets().then().catch(error => alert("error"))
   }

   _getCurrenMonthBugget = () => {
      let time = new Date();
      let month = time.getMonth() + 1;
      let currentMonth = time.getFullYear() + '-' + month;
      getCurrentMonthBuget(currentMonth).then((bugetRecord) => {
         if (bugetRecord.length > 0) {
            // alert(JSON.stringify(bugetRecord));
            this.setState({
               thisMonthBuget: bugetRecord[0]
            });
         } else {
            this._insertCurrentMonthBuget(currentMonth);
         }
      }).catch(error => {
         alert("Get buget error" + error);
         this.setState({
            thisMonthBuget: []
         });
      });
   }

   _insertCurrentMonthBuget = (monthString) => {
      let newBuget = {
         id: Math.floor(Date.now() / 1000),
         month: monthString,
         buget: 0,
         startDate: 1
      };
      insertBugetItem(newBuget).then((newRecord) => {
         // alert("Success to add new: " + JSON.stringify(newRecord));
         this.setState({
            thisMonthBuget: newRecord
         });
      }).catch(error => alert("Auto create a new buget has FAILDED: " + error))
   }


   render() {
      const { navigation, listAllExpense } = this.props;
      const currentBugetData = this.state.thisMonthBuget;
      const currentMonthData = _getDataOfMonth(currentBugetData.month, listAllExpense);
      const currentMoneyOfMonth = _calMoneyOfCurrentMonth(currentBugetData.month, currentBugetData.buget, listAllExpense);


      return (
         <View style={styles.homeHeaderContainer}>

            <View style={{ justifyContent: 'flex-end', overflow: 'hidden' }}>
               <View style={{ flexDirection: 'row' }}>
                  <Icon name="calendar" color="orange" size={16} />
                  <Text style={{ color: 'white', marginHorizontal: 7 }}>
                     {currentBugetData.month}
                  </Text>
                  <Text style={{ color: 'white', textDecorationLine: "underline" }}>
                     Ngân sách:
               </Text>
               </View>

               <TouchableOpacity
                  style={{
                     flexDirection: 'row',
                     // marginVertical: 5,
                     // borderWidth: 1, borderColor: 'gray' 
                  }}
                  onPress={() => navigation.navigate('BugetScreen', {
                     buget_id: currentBugetData.id,
                     buget_month: currentBugetData.month,
                     buget_buget: currentBugetData.buget,
                     buget_startDate: currentBugetData.startDate
                  })}>
                  <Text
                     style={{
                        color: 'white',
                        fontSize: 26,
                        fontWeight: "bold"
                     }}>
                     {formatMoney(currentMoneyOfMonth)}
                  </Text>
                  <Icon
                     name="edit"
                     color="orange"
                     // color="#900"
                     size={16}
                     style={{ paddingTop: 13, marginLeft: 5 }}
                  />
               </TouchableOpacity>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white' }}>Chi tiêu: {formatMoney(_calInOutCome(currentMonthData, 'expense'))}</Text>
                  <Text style={{ color: 'white' }}>{'  |  '}</Text>
                  <Text style={{ color: 'white' }}>Thu nhập: {formatMoney(_calInOutCome(currentMonthData, 'income'))} </Text>
               </View>
            </View>

            <TouchableOpacity style={[styles.absoluteBtn, {
               right: 100,
               top: height * 0.04,
            }]}
               onPress={() => navigation.navigate('SearchingScreen')}
            >
               <Icon name="search" size={20} color='white' />
               <Text style={{ color: 'white' }}>Tìm kiếm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.absoluteBtn, {
               right: 10,
               top: height * 0.04,
            }]}
               onPress={() => navigation.navigate('AddItems')}
            >
               <Icon name="plus" size={20} color='white' />
               <Text style={{ color: 'white' }}>Thêm mới</Text>
            </TouchableOpacity>
         </View>
      );
   }
}


const styles = StyleSheet.create({
   homeHeaderContainer: {
      // height: height * 0.16,
      backgroundColor: '#651FFF',
      flexDirection: 'row',
      paddingTop: 25,
      paddingBottom: 10,
      // paddingVertical: 15,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
   },
   btnAdd: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#CED0CE",
      height: 50,
      width: 70,
      alignSelf: 'flex-end',
   },
   absoluteBtn: {
      position: 'absolute',
      height: 50,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#CED0CE",
   }
});

export default HomeHeader;