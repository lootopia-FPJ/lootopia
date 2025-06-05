import React from 'react';
import {StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {ViroARSceneNavigator} from '@reactvision/react-viro';
import {RootStackParamList} from '../../navigation/types';
import ARScene, {setARStageId} from './ARScene';

type ARScanRouteProp = RouteProp<RootStackParamList, 'ARScan'>;

const ARScanScreen = () => {
  const route = useRoute<ARScanRouteProp>();
  const {stageId} = route.params;

  setARStageId(stageId);

  return (
    <ViroARSceneNavigator
      autofocus
      initialScene={{
        scene: ARScene,
      }}
      style={styles.flex}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default ARScanScreen;
