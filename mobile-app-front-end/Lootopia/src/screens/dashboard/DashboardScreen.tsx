import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userType, setUserType] = useState('');

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
    </View>
  );
};

export default DashboardScreen;
