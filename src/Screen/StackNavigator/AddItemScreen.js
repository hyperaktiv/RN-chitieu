import React, { useState } from 'react';
import {
   View,
   Platform,
   Text,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView,
   ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchSelector from 'react-native-switch-selector';
import { BottomSheet } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { expenseIcon } from '../../assets/icon';

import { convertToMonthString, convertToDateString } from '../../utils/utils';
import { insertExpenseItem } from '../../../database/allSchemas';

class AddItemScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         inputHeight: 40,
         visibleBottomSheet: false,
         datetime: new Date(),
         mode: 'date',
         show: false,
         money: 0,
         moneyError: '',
         category: 'expense',
         icon: '',
         name: '',
         note: '',
         buttonDisabled: true
      }

      this._submitAction = this._submitAction.bind(this);

   }

   // datetime picker
   onChangeDateTime = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.datetime;
      this.setState({
         show: !this.state.show,
         datetime: currentDate
      });
   }
   showDatepicker = () => {
      this.setState({
         show: true,
         mode: 'date'
      })
   }

   // bottomsheet
   toggleBottomNavigationView = () => {
      this.setState({
         visibleBottomSheet: !this.state.visibleBottomSheet
      })
   }

   formatDate = (date) => {
      return `${date.getDate()} Tháng ${date.getMonth() + 1},${date.getFullYear()}`;
   }
   formatTime = (time) => {
      return `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
   }
   formatMoney = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
   }

   // check if name and money is filled
   touchableButton = () => {
      this.setState({
         buttonDisabled: true
      })
      if (this.state.name !== '' && this.state.money !== 0)
         this.setState({
            buttonDisabled: false
         })
   }

   setCategory = (value) => {
      this.setState({
         category: value,
      });
   }
   setInputMoney = (money) => {
      money = money.replace(/\./gi, '');
      let money1 = parseInt(money);

      if (isNaN(money1)) {
         money1 = 0;
      }

      this.setState({
         money: money1,
         moneyError: '',
      });
      this.touchableButton();
   }
   setInputNote = (note) => {
      this.setState({
         note: note
      })
   }

   _validateFields() {
      if (this.state.money === 0) {
         this.setState({ moneyError: 'Hãy nhập số tiền', buttonDisabled: true })
      }
   }

   _submitAction() {
      const { datetime, money, icon, name, category, note } = this.state;
      const newData = {
         id: Math.floor(Date.now() / 1000),
         icon: icon,
         name: name,
         money: money,
         category: category,
         datetime: datetime.toISOString(),
         // date: convertToDateString(datetime),
         date: new Date(datetime).toDateString(),
         month: convertToMonthString(datetime),
         note: note,
         createdAt: new Date().toISOString()
      };
      insertExpenseItem(newData).then(() => {
         this.props.navigation.navigate('History');
      }).catch((error) => {
         alert(`Error: ${error}`);
      });
   }

   render() {
      const { inputHeight,
         visibleBottomSheet,
         datetime,
         mode,
         show,
         money,
         moneyError,
         category,
         name,
         note,
         buttonDisabled } = this.state;
      const disableBtn = buttonDisabled ? '#e4e6eb' : '#f0ad4e';
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container} keyboardShouldPersistTaps="handled">
               <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                  <KeyboardAvoidingView enabled>

                     {/**Phân loại === "category" */}
                     <View style={styles.rowContainer}>
                        <View style={styles.icon}>
                           <Icon name="th-large" size={20} color="#900" />
                        </View>
                        <View style={{ flex: 1 }}>
                           <Text style={styles.text}>Phân loại</Text>
                        </View>
                        <View style={[styles.inputSection, { borderColor: 'white' }]}>
                           <SwitchSelector
                              options={[
                                 { label: 'Chi tiêu', value: 'expense' },
                                 { label: 'Thu nhập', value: 'income' },
                              ]}
                              buttonColor={'#f0ad4e'}
                              initial={0}
                              onPress={this.setCategory}
                              style={{ width: '100%', height: '100%', borderColor: 'gray' }}
                              fontSize={16}
                           />
                        </View>
                     </View>

                     {/**Danh mục === Name*/}
                     <TouchableOpacity
                        style={styles.rowContainer}
                        onPress={this.toggleBottomNavigationView}
                     >
                        <View style={styles.icon}>
                           <Icon name="wallet" size={20} color="#900" />
                        </View>
                        <View style={{ flex: 1 }}>
                           <Text style={styles.text}>Danh mục</Text>
                        </View>
                        <View style={styles.inputSection}>
                           <Text style={[styles.textInput, { fontSize: 18 }]}>{name}</Text>
                           <BottomSheet
                              visible={visibleBottomSheet}
                              onBackButtonPress={this.toggleBottomNavigationView}
                              onBackdropPress={this.toggleBottomNavigationView}>
                              <View style={{
                                 backgroundColor: '#fff',
                                 width: '100%',
                                 height: 350,
                                 justifyContent: 'center',
                                 alignItems: 'flex-start',
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
                                       {expenseIcon &&
                                          expenseIcon.map((record) => (
                                             <TouchableOpacity
                                                key={record.id}
                                                style={{
                                                   flexDirection: 'row',
                                                   height: 40,
                                                }}
                                                onPress={() => {
                                                   this.setState({ name: record.name, icon: record.icon });
                                                   this.toggleBottomNavigationView();
                                                   this.touchableButton();
                                                }}>
                                                <View style={{
                                                   flex: 1,
                                                   borderColor: 'gray',
                                                   justifyContent: 'center',
                                                   alignItems: 'center',
                                                }}>
                                                   <Icon name={record.icon} size={26} />
                                                </View>
                                                <View style={{
                                                   flex: 1,
                                                   borderColor: 'gray',
                                                   justifyContent: 'center',
                                                }}>
                                                   <Text style={{ fontSize: 20 }}>{record.name}</Text>
                                                </View>
                                             </TouchableOpacity>
                                          ))}
                                    </ScrollView>
                                 </View>
                              </View>
                           </BottomSheet>
                        </View>
                     </TouchableOpacity>

                     {/**Số tiền */}
                     <View style={styles.rowContainer}>
                        <View style={styles.icon}>
                           <Icon name="wallet" size={20} color="#900" />
                        </View>
                        <View style={{ flex: 1 }}>
                           <Text style={styles.text}>Số tiền</Text>
                        </View>
                        <View style={styles.inputSection}>
                           <TextInput
                              style={[styles.textInput]}
                              returnKeyType="done"
                              onSubmitEditing={Keyboard.dismiss}
                              keyboardType="numeric"
                              // placeholder={this.formatMoney(0) + '₫'}
                              onChangeText={(money) => { this.setInputMoney(money); this.touchableButton(); }}
                              value={!isNaN(money) && this.formatMoney(money) || 0}
                           />
                        </View>
                     </View>

                     {/**Ngày tháng */}
                     <TouchableOpacity style={styles.rowContainer} onPress={this.showDatepicker}>
                        <View style={styles.icon}>
                           <Icon name="calendar" size={20} color="#900" />
                        </View>
                        <View style={styles.insideContainer}>
                           <Text style={styles.text}>Ngày tháng</Text>
                           <Text style={styles.text}>{this.formatDate(datetime)}</Text>
                           <View style={{ justiftyContent: 'center', alignItems: 'center' }}>
                              <Icon name="hand-point-right" size={20} color="#900" style={{ marginTop: 5 }} />
                           </View>
                        </View>
                     </TouchableOpacity>

                     {/**show the time picker box **/}
                     {show && (
                        <DateTimePicker
                           testID="dateTimePicker"
                           value={datetime}
                           mode={mode}
                           is24Hour={true}
                           display="default"
                           onChange={this.onChangeDateTime}
                        />
                     )}

                     {/**Ghi chú */}
                     <View style={[styles.rowContainer]}>
                        <View style={styles.icon}>
                           <Icon name="sticky-note" size={20} color="#900" />
                        </View>

                        <View style={{ flex: 1 }}>
                           <Text style={styles.text}>Ghi chú </Text>
                        </View>
                        <View style={[styles.inputSection, { height: inputHeight + 5 }]}>
                           <TextInput
                              style={[styles.textInput, { fontSize: 14, height: inputHeight }]}
                              placeholder={'Ghi chú'}
                              multiline={true}
                              returnKeyType="done"
                              onSubmitEditing={Keyboard.dismiss}
                              autoCapitalize="sentences"
                              onContentSizeChange={(e) => this.setState({ inputHeight: e.nativeEvent.contentSize.height })}
                              onChangeText={this.setInputNote}
                              value={note}
                              numberOfLines={4}
                           />
                        </View>
                     </View>

                  </KeyboardAvoidingView>

                  <TouchableOpacity activeOpacity={0.5} style={[styles.submitButton, { backgroundColor: disableBtn }]} disabled={buttonDisabled} onPress={this._submitAction}>
                     <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
                  </TouchableOpacity>

                  {/* show error */}
                  <View style={{ width: '90%', margin: 20, borderWidth: 1, borderColor: 'gray', alignItems: 'center' }}>
                     {
                        moneyError !== '' && <Text style={{ fontSize: 16, color: 'red', paddingVertical: 10, textAlign: "center", }}>{moneyError}</Text>
                     }
                  </View>
               </KeyboardAwareScrollView>
            </View>
         </TouchableWithoutFeedback>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 10,
      marginHorizontal: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#CED0CE',
      marginVertical: 20
   },
   rowContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#CED0CE',
      alignItems: 'center',
      paddingVertical: 10,
   },
   insideContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
      paddingRight: 10,
   },
   text: { fontSize: 16 },
   textInput: {
      height: '100%',
      width: '100%',
      padding: 10,
      backgroundColor: '#e8e8e8',
      textAlign: 'right',
      fontSize: 20,
      borderRadius: 8,
   },
   icon: {
      width: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
   },
   inputSection: {
      flex: 2,
      alignItems: 'flex-end',
      marginRight: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'gray',
      height: 45
   },
   submitButton: {
      marginTop: 10,
      width: '60%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
   }
});
export default AddItemScreen;