/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntialList from './src/screens/IntialList';
import Tracks from './src/screens/Tracks';
import TrackDetail from './src/screens/TrackDetail';

console.disableYellowBox = true;

// DarkTheme Configuration
const myDarkTheme = {
  dark: true,
  colors: {
    primary: "#000000",
    background: "#000000",
    card: "#000000",
    text: "#ffffff",
    border: "#000028",
    notification: "#000000"
  }
}

const Stack = createStackNavigator();

// Stack Navigator
const App = () => {
  return (
    <NavigationContainer theme={myDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="IntialList"
          component={IntialList}
          options={{ title: 'Initial Playlist' }}
        />
        <Stack.Screen
          name="Tracks"
          component={Tracks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackDetail"
          component={TrackDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
