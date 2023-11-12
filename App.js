import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './scr/SignUp';
import Login from './scr/Login';

import DisplayNote from './scr/DisplayNote';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="DisplayNote" component={DisplayNote} />
    </Stack.Navigator>
  </NavigationContainer> 
  );
}


