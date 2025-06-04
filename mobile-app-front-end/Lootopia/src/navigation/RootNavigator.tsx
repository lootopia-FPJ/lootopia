import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import ForgotPasswordScreen from '../screens/forgot-password/ForgotPasswordScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import TreasureHuntsScreen from '../screens/treasure-hunt/TreasureHuntsScreen';
import TreasureHuntDetailsScreen from '../screens/treasure-hunt/TreasureHuntDetailsScreen';
import MapEditorScreen from '../screens/map-editor/MapEditorScreen';
import MyTreasureHuntsScreen from '../screens/my-treasure-hunt/MyTreasureHuntsScreen';
import TreasureHuntMapView from '../screens/treasure-hunt/TreasureHuntMapView';
//import ARScanScreen from '../screens/scan-cache/ARScanScreen';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerBackTitle: 'Retour',
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="MyTreasureHunts"
      component={MyTreasureHuntsScreen}
      options={{title: 'Mes Chasses', headerShown: true}}
    />
    <Stack.Screen
      name="TreasureHunts"
      component={TreasureHuntsScreen}
      options={{
        title: 'Chasses au Trésor',
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="TreasureHuntDetails"
      component={TreasureHuntDetailsScreen}
      options={{
        title: 'Détails de la Chasse',
        headerShown: true,
      }}
    />
    <Stack.Screen name="EditMap" component={MapEditorScreen} />
    <Stack.Screen
      name="TreasureHuntMapView"
      component={TreasureHuntMapView}
      options={{title: 'Carte de la chasse'}}
    />
    {/* <Stack.Screen name="ARScan" component={ARScanScreen} /> */}
  </Stack.Navigator>
);

export default RootNavigator;
