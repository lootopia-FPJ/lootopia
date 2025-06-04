// import React from 'react';
// import {Alert, StyleSheet} from 'react-native';
// import {
//   ViroARScene,
//   ViroARImageMarker,
//   ViroBox,
//   ViroText,
// } from '@viro-community/react-viro';
// import {validateStageByAR} from '../../api/stageApi';

import {ViroARScene, ViroBox, ViroMaterials} from '@reactvision/react-viro';
import React from 'react';

// interface ARSceneProps {
//   stageId: number;
// }

// const ARScene: React.FC<ARSceneProps> = ({stageId}) => {
//   const handleAnchorFound = async () => {
//     try {
//       const response = await validateStageByAR(stageId);
//       Alert.alert(
//         response.message,
//         `🎉 You earned ${response.reward.crowns} crowns!\n🧰 Animation: ${response.animation}`,
//       );
//     } catch (error) {
//       const errorMessage =
//         (error as any)?.response?.data?.message || 'Erreur inconnue';
//       Alert.alert('Erreur', errorMessage);
//     }
//   };

//   return (
//     <ViroARScene>
//       <ViroARImageMarker target="marker" onAnchorFound={handleAnchorFound}>
//         <ViroBox
//           position={[0, 0, 0]}
//           scale={[0.1, 0.1, 0.1]}
//           materials={['box']}
//           animation={{name: 'pop', run: true}}
//         />
//         <ViroText
//           text="Repère détecté !"
//           position={[0, 0.2, 0]}
//           scale={[0.5, 0.5, 0.5]}
//           style={styles.viroText}
//         />
//       </ViroARImageMarker>
//     </ViroARScene>
//   );
// };

// const styles = StyleSheet.create({
//   viroText: {
//     fontFamily: 'Arial',
//     fontSize: 20,
//     color: '#ffffff',
//   },
// });

// export default ARScene;

const ARScene = () => {
  const [color, setColor] = React.useState('#ff0000');

  React.useEffect(() => {
    ViroMaterials.createMaterials({
      boxMaterial: {
        diffuseColor: color,
      },
    });
  }, [color]);

  return (
    <ViroARScene>
      <ViroBox
        position={[0, 0, -2]}
        scale={[0.3, 0.3, 0.3]}
        materials={['boxMaterial']}
        onClick={() => setColor(color === '#ff0000' ? '#0000ff' : '#ff0000')}
      />
    </ViroARScene>
  );
};

export default ARScene;
