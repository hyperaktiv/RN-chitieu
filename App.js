import React from 'react';
import { LogBox } from "react-native";

// import WelcomeScreen from './WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import realm from './database/allSchemas';
import RootTab from './src/Screen/RootTab';


// LogBox.ignoreAllLogs();

export default function App() {

  return (
    <NavigationContainer>
      <RootTab />
    </NavigationContainer>
  );
}