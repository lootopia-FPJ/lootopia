import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useUser} from '../../context/UserContext';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {isAuthenticated, user} = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 text-lg">
        Bonjour {user?.email || 'User'}
      </Text>
    </View>
  );
};

export default DashboardScreen;
