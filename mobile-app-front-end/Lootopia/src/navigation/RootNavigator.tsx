import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import ForgotPasswordScreen from '../screens/forgot-password/ForgotPasswordScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
