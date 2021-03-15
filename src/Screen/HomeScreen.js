import React from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';

import HomeHeader from '../components/HomeTab/HomeHeader';
import DayBox from '../components/HomeTab/DayBox';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { getUniqueValue } from '../utils/utils';
import realm, { queryAllExpenses } from '../../database/allSchemas';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDay: [],
      listAllExpense: []
    }
  }

  _getListDate = () => {
    queryAllExpenses().then((listExpenses) => {
      if (listExpenses.length !== 0) {
        this.setState({
          listDay: getUniqueValue(listExpenses, "date"),
          listAllExpense: listExpenses
        });

        // console.log(JSON.stringify(listExpenses))
      }
    }).catch((error) => {
      this.setState({ listDay: [], listAllExpense: [] });
    });
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._getListDate();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#651FFF" translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <HomeHeader navigation={this.props.navigation} listAllExpense={this.state.listAllExpense} />
        <FlatList
          data={this.state.listDay}
          renderItem={(item) => <DayBox navigation={this.props.navigation} date={item} listAllExpense={this.state.listAllExpense} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (<Text style={{ fontSize: 20, alignSelf: 'center', margin: 20 }}>No Item Found Here.</Text>)}
        />

      </View>
    );
  }
}
export default HomeScreen;