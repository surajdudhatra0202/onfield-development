import React, { useCallback, useEffect, useRef, useState } from 'react';
import { showPopupMessage, PrefManager } from '@utils';
import { StorageKey, Strings } from '@constants';
import { Input, ListContainer } from '@components';
import { Post } from '@services';
import type { AuthData, ApiResponse } from '@/types/global';
import { ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import c from '@/style';

type PaginatedListProps<T> = {
  renderItem: ListRenderItem<T>;
  type: number;
  dataLabel: string,
  apiEndPoint: string,
  enableUseFocusEffect?: boolean,
  searchEnable?: boolean
};

type CallItem = {
  id: string;
  priority: string;
  call_no: string;
  customer: string;
  l_date: string;
  status: string
};


function PaginatedList<T>({ renderItem, type, apiEndPoint, dataLabel, enableUseFocusEffect, searchEnable }: PaginatedListProps<T>) {
  const [page, setPage] = useState(1);
  const [lazyLoad, setLazyLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [listData, setListData] = useState<CallItem[]>([]);

  const arrivedDataRef = useRef<number[]>([]);
  const searchDelayTimer = useRef<any>(null);

  if (enableUseFocusEffect) {
    useFocusEffect(
      useCallback(() => {
        pullDown();
      }, [])
    );
  } else {
    useEffect(() => {
      pullDown();
    }, []);
  }

  const pullDown = () => {
    setPage(1);
    setLoading(true);
    setListData([]);
    setSearch('');
    arrivedDataRef.current = [];
    setTimeout(() => {
      fetchData('', 1);
    }, 50);
  };

  const fetchData = async (text: string, perPage: number) => {
    try {
      if (arrivedDataRef.current.includes(perPage)) return;
      if (arrivedDataRef.current.length < 1) {
        setLoading(true);
      } else {
        setLazyLoad(listData.length >= 10);
      }

      arrivedDataRef.current.push(perPage);

      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        page: perPage,
        type: type.toString(),
        ...(searchEnable && {
          search: text
        })
      };
      const { data, message } = await Post(apiEndPoint, request) as ApiResponse;

      if (data.status) {
        let list = [];
        if (Array.isArray(data?.data?.[dataLabel])) {
          list = data.data[dataLabel];
        } else if (Array.isArray(data?.data)) {
          list = data.data;
        }
        setListData((prev) => prev.concat(list));
        setPage((prevPage) => prevPage + 1);
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLazyLoad(false);
      setLoading(false);
    }
  };

  const onChangeText = (text: string) => {
    if (searchDelayTimer.current) clearTimeout(searchDelayTimer.current);

    setSearch(text);
    setPage(1);
    setLoading(true);
    setListData([]);
    arrivedDataRef.current = [];

    searchDelayTimer.current = setTimeout(() => {
      fetchData(text, 1);
    }, 1000);
  }

  return (
    <>
      {searchEnable && (
        <Input
          icon={'magnify'}
          stop
          iconSize={26}
          inputStyle={c.searchInputStyle}
          placeholder={Strings.searchItem}
          value={search}
          onChangeText={onChangeText}
        />
      )}

      <ListContainer
        data={listData}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={pullDown}
        onEndReached={() => {
          if (listData.length >= 10) fetchData(search, page);
        }}
        loadingMore={lazyLoad}
      />
    </>

  );
}

export default PaginatedList;