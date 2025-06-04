// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {useRoute, RouteProp} from '@react-navigation/native';
// import {ViroARSceneNavigator} from '@viro-community/react-viro';
// import {RootStackParamList} from '../../navigation/types';
// import ARScene from './ARScene';

// type ARScanRouteProp = RouteProp<RootStackParamList, 'ARScan'>;

// const ARSceneWithProps = (props: {stageId: string}) => (
//   <ARScene stageId={Number(props.stageId)} />
// );

// const ARScanScreen = () => {
//   const route = useRoute<ARScanRouteProp>();
//   const {stageId} = route.params;

//   return (
//     <ViroARSceneNavigator
//       autofocus
//       initialScene={{
//         scene: ARSceneWithProps.bind(null, {stageId: String(stageId)}),
//       }}
//       style={styles.flex}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
// });

// export default ARScanScreen;
