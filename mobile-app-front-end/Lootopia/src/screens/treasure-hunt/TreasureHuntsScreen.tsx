import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {getTreasureHunts} from '../../api/treasureHuntApi';
import {useNavigation} from '@react-navigation/native';
import {InfiniteScrollList} from '../../components/InfiniteScrollList';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {TreasureHunt} from '../../types/treasure-hunt';

type TreasureHuntScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TreasureHunts'
>;

const PAGE_SIZE = 10;

const TreasureHuntsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation<TreasureHuntScreenNavigationProp>();
  const [treasureHunts, setTreasureHunts] = useState<TreasureHunt[]>([]);

  const fetchHunts = useCallback(
    async (pageNumber: number) => {
      if (loading || !hasMore) {
        return;
      }

      setLoading(true);
      try {
        const paginatedData = await getTreasureHunts(pageNumber, PAGE_SIZE);
        if (paginatedData.length > 0) {
          setTreasureHunts(prev => {
            const existingIds = new Set(prev.map(hunt => hunt.id));
            const newItems = paginatedData.filter(
              (hunt: {id: number}) => !existingIds.has(hunt.id),
            );
            return [...prev, ...newItems];
          });
        }
        if (paginatedData.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching hunts:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore],
  );

  useEffect(() => {
    fetchHunts(page);
  }, [page, fetchHunts]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handleSelectHunt = (hunt: any) => {
    navigation.navigate('TreasureHuntDetails', {id: hunt.id});
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
          onEndReached={handleLoadMore}
          loading={loading}
          hasMore={hasMore}
        />
      </View>
    </SafeAreaView>
  );
};

export default TreasureHuntsScreen;
