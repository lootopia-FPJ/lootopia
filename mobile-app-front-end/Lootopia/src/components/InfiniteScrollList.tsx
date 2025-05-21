import React, {JSX} from 'react';
import {FlatList, ActivityIndicator, View} from 'react-native';

type InfiniteScrollListProps<T> = {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  onEndReached: () => void;
  loading: boolean;
  hasMore: boolean;
};

export function InfiniteScrollList<T>({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  loading,
  hasMore,
}: InfiniteScrollListProps<T>) {
  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View className="py-4">
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMore ? onEndReached : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}
