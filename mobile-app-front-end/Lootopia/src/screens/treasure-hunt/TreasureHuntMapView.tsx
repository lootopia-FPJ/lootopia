import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {getCachesByTreasureHunt} from '../../api/cacheApi';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import {Button} from '../../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  TreasureHuntMapView: {treasureHuntId: number};
  ARScan: {stageId: number};
};

type Cache = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
};

type RouteProps = RouteProp<RootStackParamList, 'TreasureHuntMapView'>;

export default function TreasureHuntMapView() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const {treasureHuntId} = route.params;

  const [caches, setCaches] = useState<Cache[]>([]);
  const [nearbyStage, setNearbyStage] = useState<Cache | null>(null);

  useEffect(() => {
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

    const fetchData = async () => {
      const data = await getCachesByTreasureHunt(treasureHuntId);
      setCaches(data);
    };

    const fetchLocationAndCheckProximity = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          const nearby = caches.find(marker => {
            const dist = getDistance(
              {latitude, longitude},
              {latitude: marker.latitude, longitude: marker.longitude},
            );
            return dist < 20;
          });

          setNearbyStage(nearby || null);
        },
        error => {
          console.error('GPS error', error);
        },
        {enableHighAccuracy: true},
      );
    };

    const init = async () => {
      await requestLocationPermission();
      await fetchData();
      fetchLocationAndCheckProximity();
    };

    init();
  }, [treasureHuntId, caches]);

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

      {nearbyStage && (
        <View style={styles.nearbyStageContainer}>
          <Button
            type="destructive"
            onPress={() =>
              navigation.navigate('ARScan', {stageId: nearbyStage.id})
            }>
            🎯 Vous êtes proche de “{nearbyStage.name}” — Scanner en RA
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  nearbyStageContainer: {padding: 16},
});
