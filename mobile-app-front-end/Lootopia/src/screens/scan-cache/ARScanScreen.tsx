import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroBox,
} from '@viro-community/react-viro';

ViroARTrackingTargets.createTargets({
  marker: {
    source: require('../../assets/images/logo-lootopia.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

ViroAnimations.registerAnimations({
  pop: {
    properties: {scaleX: 2, scaleY: 2, scaleZ: 2},
    duration: 500,
    easing: 'Bounce',
  },
});

const ARScene = () => {
  return (
    <ViroARScene>
      <ViroARImageMarker
        target={'marker'}
        onAnchorFound={() => {
          console.log('Landmark detected! ✅');
        }}>
        <ViroBox
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          materials={['box']}
          animation={{name: 'pop', run: true}}>
          <ViroText
            text="Stage Validated!"
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0.2, 0]}
            style={styles.viroText}
          />
        </ViroBox>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const ARScanScreen = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{scene: ARScene}}
      style={styles.flex}
    />
  );
};

const styles = StyleSheet.create({
  viroText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
  },
  flex: {
    flex: 1,
  },
});

export default ARScanScreen;
