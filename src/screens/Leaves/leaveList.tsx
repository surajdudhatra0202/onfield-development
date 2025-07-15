import { View } from 'react-native';
import React from 'react';
import { Header, ListItem } from '@components';
import c from '@style';
import { Constants, Strings } from '@constants';
import { LEAVES } from '@utils';
import dayjs from 'dayjs';
import { Routes } from '../../navigation/route';
import type { NavigationProps } from '@/navigation/navigation';
import PaginatedList from '../Shared/List/paginatedList';

interface renderItemProps {
  leave_date: string,
  reason: string
}

let d = new Date();
d.setDate(d.getDate() - 90);

const LeaveList = ({ navigation }: NavigationProps) => {

  const renderItem = ({ item }: {item : renderItemProps}) => {
    const formattedDate = dayjs(item.leave_date).format(Constants.dateFormat['SHORT_MONTH']);
    return (
      <ListItem
        status={'Pending'}
        leaveDate={formattedDate}
        reason={item.reason}
      />
    );
  };

  const openDrawer = () => navigation.openDrawer();
  const navToNext = () => navigation.navigate(Routes.RequestLeave);

  return (
    <View style={c.flex1}>
      <Header onPress={openDrawer} onAdd={navToNext} title={Strings.manageLeave} />

      <PaginatedList
        renderItem={renderItem}
        apiEndPoint={LEAVES}
        dataLabel={"leaves"}
        type={1}
        enableUseFocusEffect={true}
      />
    </View>
  );
};

export default LeaveList;
