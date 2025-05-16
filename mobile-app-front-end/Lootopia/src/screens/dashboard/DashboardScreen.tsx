import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchUser = async () => {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserEmail(user.email);
        setUserRole(user.role);
        setUserType(user.type);
      }
    };

    fetchUser();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold text-blue-500">Dashboard</Text>
      <Text>Email: {userEmail}</Text>
      <Text>Role: {userRole}</Text>
      <Text>Type: {userType}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('TreasureHunts')}
        className="bg-blue-600 px-6 py-3 rounded-lg">
        <Text className="text-white text-base font-semibold">
          Voir les chasses au trésor
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
