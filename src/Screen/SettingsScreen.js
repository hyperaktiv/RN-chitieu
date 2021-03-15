import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import HeaderSection from '../components/HeaderSection';
import SettingField from '../components/SettingField';
import BugetNavigation from './SettingStack/BugetNavigation';


export default class SettingsScreen extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      const { navigation } = this.props;
      return (
         <View style={{ flex: 1 }}>
            <HeaderSection title="Cài đặt" />
            <View style={{ height: 10 }} />
            <BugetNavigation icon="plus" name="Cài đặt ngân sách" navigation={navigation} />
            <View style={styles.divider}></View>
            <SettingField icon="plus" name="Xuất file" />
            <View style={styles.divider}></View>
            <SettingField name="Cài đặt" />
            <View style={styles.divider}></View>
            <SettingField icon="headphones" name="Góp ý" />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   divider: {
      height: 5,
   }
})