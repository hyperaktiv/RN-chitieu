import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import StatisticsScreen from '../Screen/StatisticsScreen';
import StackNavigation from '../Screen/StackNavigator/StackNavigation';
import SettingStack from '../Screen/SettingStack/SettingStack';

const Tab = createBottomTabNavigator();
function RootTab() {
   return (
      <Tab.Navigator tabBarOptions={{
         activeTintColor: 'tomato',
         inactiveTintColor: 'gray',
         labelStyle: { fontSize: 16 }
      }}
         swipeEnabled={true}
         animationEnable={true}
      >

         {/* splash screen when start up the app */}
         {/* <Tab.Screen name="welcome" component={WelcomeScreen} options={{ tabBarVisible: false }} /> */}

         <Tab.Screen name="home" component={StackNavigation} options={{
            title: 'Lịch sử',
            tabBarLabel: 'Lịch sử',
            tabBarIcon: () => (<Icon name="file-invoice" size={20} color={'#1D1E2C'} />),
         }} />
         <Tab.Screen name="statistic" component={StatisticsScreen} options={{
            title: 'Thống kê',
            tabBarLabel: 'Thống kê',
            tabBarIcon: () => (<Icon name="chart-pie" size={20} color={'#1D1E2C'} />)
         }} />
         <Tab.Screen name="settings" component={SettingStack} options={{
            title: 'Cài đặt',
            tabBarLabel: 'Cài đặt',
            tabBarIcon: () => (<Icon name="tools" size={20} color={'#1D1E2C'} />)
         }} />
      </Tab.Navigator>
   );
}
export default RootTab;