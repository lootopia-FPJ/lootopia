import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import CacheFormModal from '../../components/CacheFormModal';
import {createCache} from '../../api/cacheApi';
import {useRoute, RouteProp} from '@react-navigation/native';

type MarkerType = {
  latitude: number;
  longitude: number;
};

type RootStackParamList = {
  MapEditor: {treasureHuntId: number};
};

type MapEditorRouteProp = RouteProp<RootStackParamList, 'MapEditor'>;

export default function MapEditorScreen() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState<MarkerType | null>(null);

  const route = useRoute<MapEditorRouteProp>();
  const treasureHuntId = route.params.treasureHuntId;

  const handleMapPress = (e: MapPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setSelectedCoord({latitude, longitude});
    setModalVisible(true);
  };

  const handleSubmitCache = async (data: any, huntId: number) => {
    try {
      const payload = {
        ...data,
        treasure_hunt_id: huntId,
      };

      const savedCache = await createCache(payload);
      setMarkers(prev => [...prev, savedCache]);
      setModalVisible(false);
      setSelectedCoord(null);
      Alert.alert('Cache sauvegardé!', `ID: ${savedCache.id}`);
    } catch (err) {
      console.error('Error saving cache:', err);
      Alert.alert("Erreur', 'Échec de l'enregistrement du cache");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Stage ${index + 1}`}
            description="Appuyer sur pour modifier"
          />
        ))}
      </MapView>
      <CacheFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={data => handleSubmitCache(data, treasureHuntId)}
        coordinates={selectedCoord || {latitude: 0, longitude: 0}}
        treasureHuntId={treasureHuntId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
