import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import MapView, {Marker, MapPressEvent, Callout} from 'react-native-maps';
import CacheFormModal from '../../components/CacheFormModal';
import {
  createCache,
  updateCache,
  getCachesByTreasureHunt,
} from '../../api/cacheApi';
import {useRoute, RouteProp} from '@react-navigation/native';

type MarkerType = {
  id: number;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  contains_crowns: number;
  world_type: string;
  digging_delay?: string;
  digging_cost?: number;
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
    setSelectedCoord({
      id: Date.now(),
      name: '',
      description: '',
      latitude,
      longitude,
      contains_crowns: 0,
      world_type: 'Monde Réel',
      digging_delay: '',
      digging_cost: 0,
    });
    setModalVisible(true);
  };

  const handleEditMarker = (marker: MarkerType) => {
    setSelectedCoord(marker);
    setTimeout(() => {
      setModalVisible(true);
    }, 100);
  };

  const handleSubmitCache = async (data: any) => {
    try {
      let payload = {
        ...data,
      };

      let savedCache: MarkerType;

      const isEdit =
        selectedCoord?.id && markers.some(m => m.id === selectedCoord.id);

      if (isEdit) {
        delete (payload as any).treasure_hunt_id;
        delete (payload as any).latitude;
        delete (payload as any).longitude;

        savedCache = await updateCache(selectedCoord!.id, payload);
        setMarkers(prev =>
          prev.map(m => (m.id === selectedCoord!.id ? savedCache : m)),
        );
      } else {
        payload = {
          ...payload,
          treasure_hunt_id: treasureHuntId,
          latitude: selectedCoord?.latitude,
          longitude: selectedCoord?.longitude,
        };

        savedCache = await createCache(payload);
        setMarkers(prev => [...prev, savedCache]);
      }

      setModalVisible(false);
      setSelectedCoord(null);
      Alert.alert('Succès', 'Cache sauvegardé!');
    } catch (err: any) {
      Alert.alert(
        'Erreur',
        `Échec de l'enregistrement du cache: ${
          err?.response?.data?.message || 'Erreur inconnue'
        }`,
      );
    }
  };

  useEffect(() => {
    const fetchCaches = async () => {
      try {
        const caches = await getCachesByTreasureHunt(treasureHuntId);
        setMarkers(caches);
      } catch (err) {
        console.error('Error fetching caches:', err);
      }
    };

    fetchCaches();
  }, [treasureHuntId]);

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
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <Callout
              onPress={() => {
                handleEditMarker(marker);
              }}>
              <View style={styles.calloutContainer}>
                <Text style={styles.boldText}>{marker.name || 'Sans nom'}</Text>
                <Text style={styles.calloutSubText}>
                  Appuyer ici pour modifier
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {modalVisible && selectedCoord && (
        <CacheFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitCache}
          coordinates={{
            latitude: selectedCoord.latitude,
            longitude: selectedCoord.longitude,
          }}
          treasureHuntId={treasureHuntId}
          initialData={selectedCoord}
        />
      )}
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
  calloutContainer: {
    padding: 6,
  },
  boldText: {
    fontWeight: 'bold',
  },
  calloutSubText: {
    fontSize: 12,
    color: 'gray',
  },
});
