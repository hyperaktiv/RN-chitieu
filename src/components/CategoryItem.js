import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CategoryItem({ icon, name }) {
   return (
      <View style={styles.itemContainer}>
         <TouchableOpacity
            style={styles.buttonAction}>
            <Icon name="minus-square" size={20} color="red" />
         </TouchableOpacity>
         <View style={styles.iconCircle}>
            <Icon name={icon} size={26} />
         </View>
         <Text style={styles.itemText}>{name}</Text>
         <TouchableOpacity
            style={[
               styles.buttonAction,
               {
                  marginHorizontal: 15,
               },
            ]}>
            <Icon name="pencil" size={26} />
         </TouchableOpacity>
         <Icon name="check-circle" size={20} color="green" />
      </View>
   );
}
const styles = StyleSheet.create({
   itemContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems: 'center',
   },
   iconCircle: {
      width: 35,
      height: 35,
      backgroundColor: 'lightblue',
      borderRadius: 17,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
   },
   itemText: {
      color: '#1e1e1e',
      flex: 1,
   },
   buttonAction: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default CategoryItem;