import { View } from 'react-native';
import React from 'react';
import { Header, ListItem } from '@components';
import c from '@style';
import { Strings } from '@constants';
import { ITEMS } from '@utils';
import type { NavigationProps } from '@/navigation/navigation';
import PaginatedList from '../Shared/List/paginatedList';

interface renderItemProps {
  l_date: string,
  name: string,
  category: string,
  code: string
}

let d = new Date();
d.setDate(d.getDate() - 90);

const ViewItem = ({ navigation }: NavigationProps) => {

  const renderItem = ({ item }: { item: renderItemProps }) => {
    return (
      <ListItem
        label={"Name|Code|Category"}
        value={`${item.name}|${item.code}|${item.category}`}
        date={item.l_date}
      />
    );
  };

  const openDrawer = () => navigation.openDrawer();

  return (
    <View style={c.flex1}>
      <Header
        onPress={openDrawer}
        title={Strings.viewItem} />

      <PaginatedList
        renderItem={renderItem}
        apiEndPoint={ITEMS}
        dataLabel={"leaves"}
        type={1}
        searchEnable={true}
      />
    </View>
  );
};

export default ViewItem;