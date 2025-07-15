import React, { JSX, memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View, ViewProps } from 'react-native';
import { Colors, Strings } from '@/constants';
import { EmptyComponent } from '@/components';
import c from '@/style';

interface ListContainerProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
  keyExtractor?: (item: T, index: number) => string;
  onEndReached?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loadingMore?: boolean;
  listStyle?: ViewProps;
  threshold?: number;
  ListEmptyComponent?: JSX.Element;
}

function ListContainer<T>({
  data,
  renderItem,
  keyExtractor = (item: T, index: number) => `${index}-${(item as unknown)?.id ?? 'key'}`,
  onEndReached,
  onRefresh,
  refreshing = false,
  loadingMore = false,
  listStyle,
  threshold = 0.01,
  ListEmptyComponent,
}: ListContainerProps<T>) {
  
  const renderFooter = useCallback(() => {    
    return (
      <View style={c.lazyRoot}>
        {loadingMore && (
          <View style={c.lazyView}>
            <ActivityIndicator color={Colors.primary} size={28} />
          </View>
        )}
      </View>
    );
  }, [loadingMore]);

  const renderEmpty = useCallback(() => {
    if (!refreshing && !loadingMore) {
      return ListEmptyComponent ?? <EmptyComponent title={Strings.noData} />;
    }
    return null;
  }, [refreshing, loadingMore, ListEmptyComponent]);

  const renderRefreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={Colors.primary}
      />
    );
  }, [refreshing, onRefresh]);

  return (
    <FlatList
      data={data}
      style={[c.flex1W, listStyle]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      refreshControl={onRefresh ? renderRefreshControl() : undefined}
      onEndReached={onEndReached}
      onEndReachedThreshold={threshold}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty()}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
    />
  );
}

export default memo(ListContainer);
