import React from 'react'

import SettingScreen from '../SettingsScreen';
import BugetScreen from '../BugetScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SettingStackNavigation() {
   return (
      <Stack.Navigator initialRouteName="Settings">
         <Stack.Screen name="setting" component={SettingScreen} options={{ headerShown: false }} />
         <Stack.Screen name="BugetScreen1" component={BugetScreen} options={{ 'title': 'Cài đặt ngân sách' }} />
         {/* màn hình góp ý */}
         {/* màn hình chính sách */}
      </Stack.Navigator>

   );
}
export default SettingStackNavigation;