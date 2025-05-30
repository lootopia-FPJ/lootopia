import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {getMyTreasureHunts} from '../../api/treasureHuntApi';
import {useNavigation} from '@react-navigation/native';
import {InfiniteScrollList} from '../../components/InfiniteScrollList';
import {useUser} from '../../context/UserContext';
import {TreasureHunt} from '../../types/treasure-hunt';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TreasureHunts'>;

const PAGE_SIZE = 10;

const MyTreasureHuntsScreen = () => {
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [treasureHunts, setTreasureHunts] = useState<TreasureHunt[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchHunts = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    try {
      const data = await getMyTreasureHunts(user.id, page, PAGE_SIZE);
      if (data.length > 0) {
        const newItems = data.filter(
          (hunt: TreasureHunt) => !treasureHunts.some(h => h.id === hunt.id),
        );
        setTreasureHunts(prev => [...prev, ...newItems]);
      }
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de charger vos chasses');
    } finally {
      setLoading(false);
    }
  }, [user?.id, loading, hasMore, page, treasureHunts]);

  useEffect(() => {
    fetchHunts();
  }, [fetchHunts, page]);

  const handleSelectHunt = (hunt: TreasureHunt) => {
    navigation.navigate('TreasureHuntDetails', {id: hunt.id, from: 'my-hunts'});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <InfiniteScrollList
          data={treasureHunts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectHunt(item)}
              className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-black">{item.name}</Text>
              <Text className="text-gray-500">{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => setPage(p => p + 1)}
          loading={loading}
          hasMore={hasMore}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyTreasureHuntsScreen;
