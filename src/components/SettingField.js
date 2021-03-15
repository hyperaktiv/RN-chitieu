import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SettingItem({ icon, name }) {
   return (
      <TouchableOpacity
         style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
         }}>
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