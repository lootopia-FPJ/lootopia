import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';
import {getTreasureHuntById} from '../../api/treasureHuntApi';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {TreasureHunt} from '../../types/treasure-hunt';
import {Button} from '../../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';

type TreasureHuntDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TreasureHuntDetails'
>;

const TreasureHuntDetailsScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'TreasureHuntDetails'>
    >();
  const [hunt, setHunt] = useState<TreasureHunt | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute<TreasureHuntDetailsRouteProp>();
  const {id, from} = route.params;

  useEffect(() => {
    const fetchHunt = async () => {
      try {
        const data = await getTreasureHuntById(id);
        setHunt(data);
      } catch (error) {
        console.error('Error fetching hunt details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHunt();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hunt) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No hunt found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-2">{hunt.name}</Text>
        <Text className="text-lg text-gray-700 mb-4">{hunt.description}</Text>

        <Text className="text-base text-black mb-1">
          🎯 Difficulté : {hunt.difficulty}/10
        </Text>
        <Text className="text-base text-black mb-1">
          ⏱ Se termine le :{' '}
          {hunt.ended_at
            ? new Date(hunt.ended_at).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Non définie'}
        </Text>
        <Text className="text-base text-black mb-1">
          👥 Joueurs max : {hunt.max_players || 'Illimité'}
        </Text>
        <Text className="text-base text-black mb-1">
          💰 Frais d’entrée :{' '}
          {hunt.entry_fee ? `${hunt.entry_fee} pièces` : 'Gratuit'}
        </Text>
        <Text className="text-base text-black mb-1">
          🌍 Réel : {hunt.is_real_world ? 'Oui' : 'Non'}
        </Text>
        <Text className="text-base text-black mb-1">
          🔓 Public : {hunt.is_public ? 'Oui' : 'Non'}
        </Text>
        <Text className="text-base text-black mb-1">
          🏆 Type de récompense : {hunt.reward_type}
        </Text>
        <Text className="text-base text-black mb-1">
          ⛏ Délai de creusage : {hunt.digging_delay} secondes
        </Text>
        <Text className="text-base text-black">
          💎 Coût de creusage : {hunt.digging_cost} pièces
        </Text>
        <Text className="text-base text-blue-700 font-semibold mb-4">
          🗺 Mode sélectionné :{' '}
          {hunt.is_real_world ? 'Monde Réel' : 'Monde Cartographique'}
        </Text>

        {from === 'my-hunts' && (
          <Button
            type="destructive"
            size="md"
            onPress={() =>
              navigation.navigate('EditMap' as any, {treasureHuntId: hunt.id})
            }>
            Gérer les caches sur la carte
          </Button>
        )}

        {from !== 'my-hunts' && (
          <Button
            type="destructive"
            size="md"
            onPress={() =>
              navigation.navigate('TreasureHuntMapView' as any, {
                treasureHuntId: hunt.id,
              })
            }>
            Participer
          </Button>
        )}
        <Button type="outline" onPress={() => navigation.navigate('ARScan')}>
          Scanner un repère en RA
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TreasureHuntDetailsScreen;
