import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AddNotes from '../screens/AddNotes';
const Stack = createStackNavigator();
export type RootNavigatorProps = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  AddNotes: undefined;
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        <Stack.Screen name={'AddNotes'} component={AddNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
