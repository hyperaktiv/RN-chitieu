import React, { Component } from 'react'
import {
   View,
   Image,
   Text,
   StyleSheet,
   Animated,
   ActivityIndicator,
   Alert,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

const switchToAuth = () => {
   Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
         {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
         },
         { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
   );

};
{/**https://www.seekpng.com/png/small/509-5099650_money-saving-icon-png-clipart-saving-computer-icons.png 
https://e7.pngegg.com/pngimages/164/679/png-clipart-money-market-saving-money-spread-saving-cartoon.png
*/}
class WelcomeScreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
         LogoAnime: new Animated.Value(0),
         LogoText: new Animated.Value(0),
         loadingSpinner: false,
      };
   }

   componentDidMount() {
      const { LogoAnime, LogoText } = this.state;
      Animated.parallel([
         Animated.spring(LogoAnime, {
            toValue: 1,
            tension: 10,
            friction: 2,
            duration: 2000,
            // useNativeDriver: true
         }).start(),
         Animated.timing(LogoText, {
            toValue: 1,
            duration: 2000,
            // useNativeDriver: true
         })
      ]).start(() => {
         this.setState({
            loadingSpinner: true,
         });
         // setTimeout(switchToAuth, 1500);
         setTimeout(() => {
            this.props.navigation.navigate('home');
         }, 4000);
      });
   }
   render() {
      return (
         <View style={styles.container}>
            <Animated.View
               style={{
                  opacity: this.state.LogoAnime,
                  top: this.state.LogoAnime.interpolate({
                     inputRange: [0, 1],
                     outputRange: [100, 0],
                  }),
               }}>
               <Image
                  style={styles.logoImg}
                  source={{ uri: 'https://www.seekpng.com/png/small/509-5099650_money-saving-icon-png-clipart-saving-computer-icons.png' }}
                  resizeMode="cover"
               />
            </Animated.View>
            <Animated.View style={{ opacity: this.state.LogoText }}>
               <Text style={styles.logoText}>Xem Chi Tiêu</Text>
            </Animated.View>
            <Animated.View>
               {this.state.loadingSpinner ? (
                  <ActivityIndicator
                     style={styles.loadSpinner}
                     size="large"
                     color="white"
                  />
               ) : null}
            </Animated.View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#651FFF',
      justifyContent: 'center',
      alignItems: 'center',
   },
   logoImg: {
      alignSelf: 'center',
      height: 120,
      width: 120,
      borderWidth: 1,
      borderRadius: 75,
   },
   logoText: {
      color: '#FFFFFF',
      fontSize: 30,
      marginTop: 29.1,
      fontWeight: '300',
   },
   loadSpinner: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 50,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
   }
});
// đã build lần 1: 10/11/2020
export default WelcomeScreen;