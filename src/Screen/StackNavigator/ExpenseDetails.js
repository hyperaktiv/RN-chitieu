import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { convertDate, convertTime } from '../../utils/utils';
import { deleteExpenseItem, queryOneExpense } from '../../../database/allSchemas';

class ExpenseDetails extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         detailData: [],
         money: 0
      }
   }

   componentDidMount() {
      this._unsubscribe1 = this.props.navigation.addListener('focus', () => {
         this._getExpenseData(this.props.route.params.id);
      });
   }
   componentWillUnmount() {
      this._unsubscribe1();
   }

   _getExpenseData = (expenseID) => {
      queryOneExpense(expenseID).then((expenseData) => {
         if (expenseData.length > 0)
            this.setState({
               detailData: expenseData[0],
               money: expenseData[0].money
            });
         else {
            alert('No user found');
            this.setState({
               detailData: []
            });
         }
      }).catch(error => {
         this.setState({
            detailData: []
         })
      });
   }

   formatMoney = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
   }

   displayCategory = (category) => {
      if (category === 'expense') return "Chi tiêu";
      else if (category === 'income') return "Thu nhập";
   }


   render() {
      const { detailData, money } = this.state;
      // let detailData = this.props.route.params.data;

      return (
         <View style={styles.container}>

            {/**Chi tiêt */}
            <View style={styles.billContainer}>
               <View style={styles.cateIcon}>
                  <Icon name={detailData.icon} size={26} color="#900" />
               </View>
               <View style={styles.insideContainer}>
                  <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold' }]}>{detailData.name}</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.formatMoney(money) + '₫'}</Text>
               </View>
            </View>

            <View style={styles.rowContainer}>
               <View style={{ width: 20 }}>
                  <Icon name="th-large" size={20} color="#900" />
               </View>
               <View style={styles.insideContainer}>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.text}>Phân loại</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                     <Text style={styles.text}>{this.displayCategory(detailData.category)}</Text>
                  </View>
               </View>
            </View>

            <View style={styles.rowContainer}>
               <View style={{ width: 20 }}>
                  <Icon name="calendar" size={20} color="#900" />
               </View>
               <View style={styles.insideContainer}>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.text}>Ngày tháng</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                     <Text style={styles.text}>{convertDate(detailData.datetime)}</Text>
                  </View>
               </View>
            </View>

            {/* <View style={styles.rowContainer}>
               <View style={{ width: 20 }}>
                  <Icon name="calendar" size={20} color="#900" />
               </View>
               <View style={styles.insideContainer}>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.text}>Thời gian</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                     <Text style={styles.text}>{convertTime(detailData.datetime)}</Text>
                  </View>
               </View>
            </View> */}

            <View style={styles.rowContainer}>
               <View style={{ width: 20 }}>
                  <Icon name="sticky-note" size={20} color="#900" />
               </View>
               <View style={styles.insideContainer}>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.text}>Ghi chú</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                     <Text style={styles.text}>{detailData.note}</Text>
                  </View>
               </View>
            </View>

            <View style={{
               flexDirection: 'row',
               justifyContent: 'space-around',
               marginTop: 10,
            }}>
               <TouchableOpacity style={styles.button}
                  activeOpacity={0.5}
                  onPress={() => {
                     this.props.navigation.navigate('EditExpense', {
                        expenseID: detailData.id,
                        selectCategory: detailData.category === 'expense' ? 0 : 1
                     });
                  }}>
                  <Icon name="edit" size={20} color='white' />
               </TouchableOpacity>
               <TouchableOpacity style={styles.button}
                  activeOpacity={0.5}
                  onPress={() => {
                     deleteExpenseItem(detailData.id).then(() => {
                        this.props.navigation.navigate('History');
                     }).catch(error => {
                        alert("Failed to delete this item, error: " + error)
                     })
                  }}
               >
                  <Icon name="trash" size={20} color='white' />
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      marginTop: 20,
      marginHorizontal: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#CED0CE",
   },
   billContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#CED0CE",
      justifyContent: 'space-between',
   },
   cateIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
   },
   rowContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#CED0CE",
      alignItems: 'center',
      paddingVertical: 10
   },
   insideContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
      paddingHorizontal: 10
   },
   text: { fontSize: 16 },
   button: {
      width: 100,
      height: 50,
      backgroundColor: '#f0ad4e',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
   },
});

export default ExpenseDetails;
