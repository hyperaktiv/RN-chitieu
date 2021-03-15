import React from 'react'

import HomeScreen from '../HomeScreen';
import AddItemScreen from './AddItemScreen';
import EditItemScreen from './EditItemScreen';
import ExpenseDetails from './ExpenseDetails';
import BugetScreen from '../BugetScreen';

import SearchingScreen from './SearchingScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackNavigation() {
   return (
      <Stack.Navigator>
         <Stack.Screen name="History" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="AddItems" component={AddItemScreen} options={{ 'title': 'Thêm mới' }} />
         <Stack.Screen name="ItemDetails" component={ExpenseDetails} options={{ 'title': 'Thông tin chi tiết' }} />
         <Stack.Screen name="EditExpense" component={EditItemScreen} options={{ 'title': 'Cập nhật thông tin' }} />
         <Stack.Screen name="BugetScreen" component={BugetScreen} options={{ 'title': 'Cài đặt ngân sách' }} />
         <Stack.Screen name="SearchingScreen" component={SearchingScreen} options={{ 'title': 'Tìm kiếm theo ngày' }} />

      </Stack.Navigator>
   );
}
export default StackNavigation;