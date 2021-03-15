import * as React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatMoney } from '../../utils/utils';

class ExpenseComponent extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { navigation, data } = this.props;
      return (
         <TouchableOpacity
            style={{
               flexDirection: 'row',
               marginVertical: 10,
               alignItems: 'center',
            }}
            onPress={() => navigation.navigate('ItemDetails', {
               // data: data,
               id: data.id
            })}
         >
            <View style={{ width: 25, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
               <Icon name={data.icon} color="#900" size={18} />
            </View>

            <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               flex: 1,
            }}>
               <View style={{ flex: 5, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18 }}>{data.name}</Text>
                  {data.note !== '' &&
                     <Text style={{ fontSize: 12, color: 'gray' }}>- {data.note}</Text>
                  }
               </View>

               <View style={{ flex: 3, alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, color: data.category === 'income' ? '#fc820a' : 'black' }}>{formatMoney(data.money, data.category)}</Text>
               </View>

            </View>
         </TouchableOpacity>
      );
   }
}

export default ExpenseComponent;