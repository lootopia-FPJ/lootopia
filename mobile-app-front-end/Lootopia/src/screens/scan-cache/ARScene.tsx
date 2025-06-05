import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroBox,
  ViroText,
  ViroMaterials,
  ViroARTrackingTargets,
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
    physicalWidth: 0.1, // meters
  },
});

ViroMaterials.createMaterials({
  box: {
    diffuseColor: '#FF0000',
  },
});

// ✅ Scene component without props
const ARScene = () => {
  const stageId = CURRENT_STAGE_ID;

  const handleAnchorFound = async () => {
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
        <ViroBox
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          materials={['box']}
          animation={{name: 'pop', run: true}}
        />
        <ViroText
          text="Repère détecté !"
          position={[0, 0.2, 0]}
          scale={[0.5, 0.5, 0.5]}
          style={styles.viroText}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  viroText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
  },
});

export default () => <ARScene />;
