import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {HomeScreenNavigationProp} from '../../navigation/types';
import {Button} from '../../components/Button';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser, getCurrentUser} from '../../api/authApi';
import {useUser} from '../../context/UserContext';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Veuillez saisir un e-mail valide')
    .required("L'e-mail est obligatoire"),
  password: yup
    .string()
    .min(
      6,
      ({min}) => `Le mot de passe doit comporter au moins ${min} caractères`,
    )
    .required('Le mot de passe est obligatoire'),
});

const LoginScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {setAuthenticated, setUser} = useUser();

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      const data = await loginUser(values.email, values.password);
      console.log('Login success:', data);
      await AsyncStorage.setItem('token', data.accessToken);

      const user = await getCurrentUser(data.accessToken);
      console.log('Fetched user:', user);

      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      Alert.alert('Success', 'Login successful');
      setAuthenticated(true);
      navigation.navigate('Dashboard');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert(
        'Login failed',
        error.response?.data?.message || 'Unknown error',
      );
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="items-center mb-6">
        <Image
          source={require('../../assets/images/logo-lootopia.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text className="text-2xl font-bold text-center mb-6">Connexion</Text>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 mb-2">
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                className="flex-1 text-base"
              />
            </View>
            {errors.email && touched.email && (
              <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>
            )}
            <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 mb-2">
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                className="flex-1 text-base"
              />
            </View>
            {errors.password && touched.password && (
              <Text className="text-red-500 text-sm mb-2">
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              className="mb-4 self-end">
              <Text className="text-blue-500 text-sm">
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
            <View className="items-center p-6">
              <Button
                type="destructive"
                size="md"
                onPress={() => handleSubmit()}>
                Se connecter
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
