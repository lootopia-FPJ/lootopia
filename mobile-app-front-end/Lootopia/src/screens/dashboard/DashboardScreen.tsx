import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TreasureHuntsScreen from '../treasure-hunt/TreasureHuntsScreen';
import MyTreasureHuntsScreen from '../my-treasure-hunt/MyTreasureHuntsScreen';

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Toutes les chasses" component={TreasureHuntsScreen} />
      <Tab.Screen name="Mes chasses" component={MyTreasureHuntsScreen} />
    </Tab.Navigator>
  );
};

const DashboardScreen = () => {
  return <DashboardTabs />;
};

export default DashboardScreen;
