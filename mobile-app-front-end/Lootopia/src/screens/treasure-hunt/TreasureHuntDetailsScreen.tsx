import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';
import {getTreasureHuntById} from '../../api/treasureHuntApi';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {TreasureHunt} from '../../types/treasure-hunt';

type TreasureHuntDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TreasureHuntDetails'
>;

const TreasureHuntDetailsScreen = () => {
  const [hunt, setHunt] = useState<TreasureHunt | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute<TreasureHuntDetailsRouteProp>();
  const {id} = route.params;

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
          ⏱ Durée : {hunt.duration ? `${hunt.duration} minutes` : 'Non définie'}
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
      </View>
    </SafeAreaView>
  );
};

export default TreasureHuntDetailsScreen;
