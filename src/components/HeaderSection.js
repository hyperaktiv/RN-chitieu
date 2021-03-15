import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderSection({ title }) {
   return (
      <View style={styles.headerContainer}>
         <Text style={styles.headerTitle}>
            {title}
         </Text>
      </View>
   );
}
const styles = StyleSheet.create({
   headerContainer: {
      marginTop: 20,
      height: 65,
      backgroundColor: '#651FFF',
      justifyContent: 'center',
      alignItems: 'center'
   },
   headerTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
   }
});