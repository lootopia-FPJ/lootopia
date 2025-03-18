import {View, Text, StyleSheet} from 'react-native';
import './global.css';

const App = () => (
  <View className="flex-1 justify-center items-center bg-gray-200">
    <Text className="text-red-500 text-lg">
      Hello, NativeWind with Tailwind!
    </Text>
    <View style={styles.main}>
      <Text style={styles.customText}>Hello, this is the font test text</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customText: {
    color: 'red',
    fontFamily: 'Inter',
  },
});

export default App;
