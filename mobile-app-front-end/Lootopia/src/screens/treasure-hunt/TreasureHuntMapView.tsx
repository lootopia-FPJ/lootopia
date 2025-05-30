import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useRoute, RouteProp} from '@react-navigation/native';
import {getCachesByTreasureHunt} from '../../api/cacheApi';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

type RootStackParamList = {
  TreasureHuntMapView: {treasureHuntId: number};
};

type RouteProps = RouteProp<RootStackParamList, 'TreasureHuntMapView'>;

export default function TreasureHuntMapView() {
  const route = useRoute<RouteProps>();
  const {treasureHuntId} = route.params;

  const [caches, setCaches] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCachesByTreasureHunt(treasureHuntId);
      setCaches(data);
    };

    const requestLocationPermission = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);
      if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        const newResult = await request(permission);
        if (newResult !== RESULTS.GRANTED) {
          Alert.alert(
            'Permission requise',
            'Nous avons besoin de votre position pour afficher la carte correctement.',
          );
        }
      }
    };

    requestLocationPermission();
    fetchData();
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
        }}>
        {caches.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});
