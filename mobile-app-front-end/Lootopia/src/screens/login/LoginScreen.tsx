import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';

import {HomeScreenNavigationProp} from '../../navigation/types';
import {Button} from '../../components/Button';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const handleLogin = (values: {email: string; password: string}) => {
    console.log('Login form values:', values);
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
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="black"
                className="mr-2"
              />
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
              <MaterialCommunityIcons
                name="lock"
                size={20}
                color="black"
                className="mr-2"
              />
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
