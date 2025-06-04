import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../components/Button';
import {HomeScreenNavigationProp} from '../../navigation/types';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="p-4">
        <Image
          source={require('../../assets/images/logo-lootopia.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View className="items-center w-full max-w-md mt-6">
        <Text className="text-4xl font-bold text-red-700 uppercase">
          LOOTOPIA
        </Text>
        <Text className="text-xl font-bold text-black mt-2 text-center">
          find treasure hunt games near you
        </Text>
      </View>
      <View className="flex-row gap-4 mt-6">
        <Button
          type="destructive"
          size="md"
          onPress={() => navigation.navigate('Login')}>
          Se connecter
        </Button>
        <Button
          type="destructive"
          size="md"
          onPress={() => navigation.navigate('EditMap')}>
          Edit map
        </Button>
      </View>
      <View className="absolute bottom-10 flex-row gap-6">
        <Text className="text-black text-sm">Termes</Text>
        <Text className="text-black text-sm">Privacy</Text>
        <Text className="text-black text-sm">Contact</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
