import { Header, ListItem } from '@/components';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Strings } from '@/constants';
import c from '@/style';
import { navigate } from '@/navigation/navigationHelper';
import { Routes } from '@/navigation/route';
import { showPopupMessage } from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useCallback } from 'react';

const Notification = ({ navigation }) => {
  const goBack = () => navigation.goBack();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        goBack()
        return true;
      });

      return () => subscription.remove();
    }, [navigation]),
  );

  const renderItem = ({ item }) => {
    return (
      <ListItem
        notification={item.text}
        notification_time={item.notification_time}
        status="Medium"
        onPress={() => handleNavigate(item.type)}
      />
    );
  };

  const ListFooterComponent = () => <View style={c.h26} />;

  const handleNavigate = (type) => {
    try {
      switch (type) {
        case 1:
          navigate(Routes.Home);
          break;
        case 2:
          navigate(Routes.Order);
          break;
        case 3:
          navigate(Routes.LeaveList);
          break;
        default:
          console.log('not related screen');
      }
    } catch (error) {
      showPopupMessage(Strings.error, String(error), true);
    }
  };

  return (
    <View style={c.flex1}>
      <Header isBack onPress={goBack} title={Strings.notification} notification />

      {/* <PaginatedList renderItem={renderItem} dataLabel='ewtgwef'  /> */}
      <FlatList
        data={mockNotification}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default Notification;


// type: 0 = nothing, 1 = home screen/call , 2 = order screen, 3 leave

const mockNotification = [
  { text: 'New system notification received.', notification_time: '2 minutes ago', type: 0 },
  { text: 'New message from Sarah Connor.', notification_time: '12 minutes ago', type: 1 },
  { text: 'Your order #4512 has been shipped.', notification_time: '5 minutes ago', type: 2 },
  { text: 'Payment of ₹4,200 was received.', notification_time: '20 minutes ago', type: 3 },
  { text: 'Friend request from David Miller.', notification_time: '35 minutes ago', type: 2 },
  { text: 'Call scheduled with HR at 4 PM.', notification_time: '50 minutes ago', type: 1 },
  { text: 'Server reboot completed successfully.', notification_time: '1 hour ago', type: 0 },
  { text: 'Order #4589 has been cancelled.', notification_time: '1 hour ago', type: 2 },
  { text: 'Leave request approved.', notification_time: '2 hours ago', type: 3 },
  { text: 'Security alert: Login from a new location.', notification_time: '3 hours ago', type: 3 },
  { text: 'App update version 3.0 available.', notification_time: '5 hours ago', type: 1 },
  { text: 'System maintenance scheduled for Saturday.', notification_time: '8 hours ago', type: 0 },
  { text: 'Meeting reminder: Sales team at 11 AM.', notification_time: '12 hours ago', type: 1 },
  { text: 'Order #4720 delivered successfully.', notification_time: '18 hours ago', type: 2 },
  { text: 'Weekly performance report is ready.', notification_time: '22 hours ago', type: 3 },
  { text: 'You earned 100 reward points.', notification_time: '1 day ago', type: 3 },
  { text: 'Invoice #7801 is ready for download.', notification_time: '2 days ago', type: 1 },
  { text: 'Backup completed successfully.', notification_time: '3 days ago', type: 2 },
  {
    text: 'General announcement: Office closed tomorrow.',
    notification_time: '5 days ago',
    type: 0,
  },
  { text: 'Subscription renewed successfully.', notification_time: '7 days ago', type: 1 },
];
