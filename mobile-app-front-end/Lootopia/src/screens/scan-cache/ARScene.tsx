import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroBox,
  ViroText,
  ViroMaterials,
  ViroARTrackingTargets,
  ViroAnimations,
} from '@reactvision/react-viro';
import {validateStageByAR} from '../../api/stageApi';

let CURRENT_STAGE_ID: number;

export const setARStageId = (id: number) => {
  CURRENT_STAGE_ID = id;
};

ViroARTrackingTargets.createTargets({
  marker: {
    source: require('../../assets/images/logo-lootopia.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

ViroMaterials.createMaterials({
  chest: {
    diffuseColor: '#FFD700',
  },
});

ViroAnimations.registerAnimations({
  rotateChest: {
    properties: {rotateY: '+=90'},
    duration: 500,
  },
  popAndRotate: {
    children: ['rotateChest', 'rotateChest', 'rotateChest'],
  } as any,
});

const ARScene = () => {
  const stageId = CURRENT_STAGE_ID;
  const [digStarted, setDigStarted] = useState(false);

  const handleAnchorFound = () => {
    setDigStarted(true);
  };

  const handleDig = async () => {
    try {
      const response = await validateStageByAR(stageId);
      Alert.alert(
        response.message,
        `🎉 You earned ${response.reward.crowns} crowns!\n🧰 Animation: ${response.animation}`,
      );
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || 'Erreur inconnue';
      Alert.alert('Erreur', errorMessage);
    }
  };

  return (
    <ViroARScene>
      <ViroARImageMarker target="marker" onAnchorFound={handleAnchorFound}>
        {digStarted && (
          <>
            <ViroBox
              position={[0, 0, 0]}
              scale={[0.2, 0.2, 0.2]}
              materials={['chest']}
              animation={{name: 'popAndRotate', run: true, loop: true}}
            />
            <ViroText
              text="🚩 Creuser ici"
              position={[0, 0.3, 0]}
              scale={[0.5, 0.5, 0.5]}
              style={styles.viroText}
              onClick={handleDig}
            />
          </>
        )}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  viroText: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: '#00FF00',
    textAlign: 'center',
  },
});

export default () => <ARScene />;
