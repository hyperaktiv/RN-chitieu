import React from 'react';
import {
   View,
   Text,
   TextInput,
   StyleSheet,
   Switch,
   Keyboard,
   TouchableWithoutFeedback,
   TouchableOpacity,
   ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheet } from 'react-native-btr';

import { updateBugetItem } from '../../database/allSchemas';


class BugetSetting extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isEnableSwitch: true,
         visibleBottomSheet: false,
         currentBugetMoney: this.props.route.params.buget_buget,
         startDate: this.props.route.params.buget_startDate,
         bugetID: this.props.route.params.buget_id,
         bugetMonth: this.props.route.params.buget_month
      }
   }

   toggleSwitch = () => {
      if (this.state.isEnableSwitch === true)
         this.setState({
            isEnableSwitch: !this.state.isEnableSwitch,
            currentBugetMoney: 0
         })
      else
         this.setState({
            isEnableSwitch: !this.state.isEnableSwitch,
         })
   }
   formatMoney = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
   }
   setInputMoney = (money) => {
      money = money.replace(/\./gi, '');
      let money1 = parseInt(money);

      if (isNaN(money1))
         money1 = 0;
      this.setState({
         currentBugetMoney: money1
      })
   }

   // bottomsheet
   toggleBottomNavigationView = () => {
      this.setState({
         visibleBottomSheet: !this.state.visibleBottomSheet
      })
   }

   _saveClick = () => {
      const { bugetID, bugetMonth, currentBugetMoney, startDate } = this.state;
      const updateBugetData = {
         id: bugetID,
         month: bugetMonth,
         buget: currentBugetMoney,
         startDate: startDate
      };
      updateBugetItem(updateBugetData).then(() => {
         this.props.navigation.navigate('History');
      }).catch((error) => {
         alert(`Error to UPDATE buget: ${error}`);
      });
   }

   render() {
      const { isEnableSwitch, currentBugetMoney, startDate, visibleBottomSheet } = this.state;

      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let numDay = new Date(year, month, 0).getDate();
      let bottomSheetRow = [];
      for (let i = 1; i <= numDay; i++) {
         let icon = "circle";
         if (i == startDate) icon = "check-square";
         bottomSheetRow.push({ i, icon })
      }

      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
               <View style={{ flex: 1 }}>
                  <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
                     {/** Ngân sách switch */}
                     <View style={styles.switchSection}>
                        <Text style={{ fontSize: 16 }}>Ngân sách</Text>
                        <Switch
                           trackColor={{ false: '#767577', true: '#81b0ff' }}
                           thumbColor={isEnableSwitch ? '#fff' : '#f4f3f4'}
                           ios_backgroundColor="#3e3e3e"
                           onValueChange={this.toggleSwitch}
                           value={isEnableSwitch}
                        />
                     </View>

                     {/** Input số tiền */}
                     <View style={styles.editSection}>
                        <Icon name="edit" size={30} />
                        <View style={{
                           flexDirection: 'row',
                           marginLeft: 10,
                           alignItems: 'center',
                        }}>
                           <Text style={{ fontSize: 16 }}>Số tiền:</Text>
                           <TextInput
                              keyboardType="decimal-pad"
                              placeholder="Số tiền"
                              selectionColor="#428af8"
                              style={styles.bugetInput}
                              returnKeyType="done"
                              onSubmitEditing={Keyboard.dismiss}
                              onChangeText={(money) => { this.setInputMoney(money); }}
                              value={!isNaN(currentBugetMoney) && this.formatMoney(currentBugetMoney) || 0}
                              editable={isEnableSwitch}  // editable when 
                           />
                        </View>
                     </View>

                     <View style={styles.editSection}>
                        <Text style={{ fontSize: 16, color: 'gray' }}>
                           Áp dụng: "Tháng này"
                        </Text>
                     </View>

                     {/** Số dư switch switch */}
                     <View style={styles.switchSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                           <Text style={{ fontSize: 16 }}>Số dư</Text>
                           <Text> (không ngân sách)</Text>
                        </View>
                        <Switch
                           trackColor={{ false: '#767577', true: '#81b0ff' }}
                           thumbColor={isEnableSwitch ? '#f5dd4b' : '#f4f3f4'}
                           ios_backgroundColor="#3e3e3e"
                           onValueChange={this.toggleSwitch}
                           value={!isEnableSwitch}
                        />
                     </View>

                     <View style={styles.editSection}>
                        <Text style={{ fontSize: 16, color: 'gray' }}>
                           Áp dụng: "Tháng này"
                        </Text>
                     </View>

                     <View style={styles.divider}></View>

                     {/** Ngày bắt đầu switch */}
                     <View style={styles.editSection}>
                        <Icon name="edit" size={30} />
                        <TouchableOpacity style={{
                           flex: 1,
                           flexDirection: 'row',
                           marginLeft: 10,
                           alignItems: 'center',
                        }}
                           onPress={this.toggleBottomNavigationView}
                        >
                           <Text style={{ fontSize: 16 }}>Ngày bắt đầu:</Text>
                           <View style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10,
                              height: 45,
                              width: 55,
                           }}>
                              <Text style={styles.startDate}>{startDate}</Text>
                              <BottomSheet visible={visibleBottomSheet}
                                 onBackButtonPress={this.toggleBottomNavigationView}
                                 onBackdropPress={this.toggleBottomNavigationView}
                              >
                                 <View style={{
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    height: 380,
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
                                       }}>Chọn ngày bắt đầu</Text>
                                       <ScrollView style={{ flex: 1 }}>
                                          {bottomSheetRow.map(item => (<TouchableOpacity
                                             key={item.i}
                                             style={{
                                                flexDirection: 'row',
                                                height: 40,
                                             }}
                                             onPress={() => {
                                                this.setState({
                                                   startDate: parseInt(item.i)
                                                });
                                                this.toggleBottomNavigationView();
                                             }}>
                                             <View style={{
                                                flex: 1,
                                                borderColor: 'gray',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                             }}>
                                                <Icon name={item.icon} size={26} />
                                             </View>
                                             <View style={{
                                                flex: 1,
                                                borderColor: 'gray',
                                                justifyContent: 'center',
                                             }}>
                                                <Text style={{ fontSize: 20 }}>{item.i}</Text>
                                             </View>
                                          </TouchableOpacity>))}
                                       </ScrollView>
                                    </View>
                                 </View>
                              </BottomSheet>
                           </View>

                        </TouchableOpacity>

                        <View style={{
                           flex: 1,
                           flexDirection: 'row',
                           marginLeft: 10,
                           alignItems: 'center',
                           justifyContent: 'center'
                        }}>
                           <TouchableOpacity activeOpacity={0.5}
                              style={styles.saveBtn}
                              onPress={this._saveClick}>
                              <Text style={{ color: 'white', fontSize: 16 }}>Lưu</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </View>
            </KeyboardAwareScrollView>
         </TouchableWithoutFeedback >
      );
   }
}
const styles = StyleSheet.create({
   switchSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
   },
   editSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
   },
   bugetInput: {
      paddingLeft: 10,
      fontSize: 20,
      marginLeft: 5,
      width: 280,
      height: 50,
      borderWidth: 1,
   },
   startDate: {
      fontSize: 20,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'gray',
      backgroundColor: '#e8e8e8',
      padding: 10,
   },
   divider: {
      height: 1,
      backgroundColor: 'gray',
      marginVertical: 15,
   },
   saveBtn: {
      width: '50%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'skyblue'
   }
});

export default BugetSetting;
