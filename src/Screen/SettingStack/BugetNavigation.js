import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getCurrentMonthBuget, insertBugetItem } from '../../../database/allSchemas';


export default class BugetNavigation extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         thisMonthBuget: []
      }

      this._getCurrenMonthBugget();
   }

   _getCurrenMonthBugget = () => {
      let time = new Date();
      let month = time.getMonth() + 1;
      let currentMonth = time.getFullYear() + '-' + month;
      getCurrentMonthBuget(currentMonth).then((bugetRecord) => {
         if (bugetRecord.length > 0) {
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
         this.setState({
            thisMonthBuget: newRecord
         });
      }).catch(error => alert("Auto create a new buget has FAILDED: " + error))
   }

   render() {
      const { icon, name, navigation } = this.props;
      const currentBugetData = this.state.thisMonthBuget;
      // console.log(navigation);
      return (
         <TouchableOpacity
            style={{
               backgroundColor: '#fff',
               flexDirection: 'row',
               paddingHorizontal: 20,
               paddingVertical: 10,
               alignItems: 'center',
            }}
            onPress={() => {
               navigation.navigate('BugetScreen1', {
                  buget_id: currentBugetData.id,
                  buget_month: currentBugetData.month,
                  buget_buget: currentBugetData.buget,
                  buget_startDate: currentBugetData.startDate
               });
            }}
         >
            <Icon name={icon} size={26} color="#1e1e1e" />
            <Text style={{
               flex: 1,
               color: '#1e1e1e',
               marginLeft: icon ? 20 : 0,
            }}>
               {name}
            </Text>
            <Icon name="angle-right" size={26} color="#1e1e1e" />
         </TouchableOpacity>
      );
   }
}