import { Header, ListItem } from '@/components';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Strings } from '@/constants';
import c from '@/style';

const Notification = ({ navigation }) => {
  const goBack = () => navigation.goBack();

  const renderItem = ({ item }) => {
    return (
      <ListItem
        notification={item.text}
        notification_time={item.notification_time}
        status="Medium"
      />
    );
  };

  const ListFooterComponent = () => <View style={c.h26} />;

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

const mockNotification = [
  { text: 'Your order #1245 has been shipped.', notification_time: '5 minutes ago' },
  { text: 'New message from John Doe.', notification_time: '20 minutes ago' },
  { text: 'Payment of ₹2,500 was received.', notification_time: '1 hour ago' },
  { text: 'Meeting scheduled for tomorrow at 10 AM.', notification_time: '3 hours ago' },
  { text: 'Weekly sales report is ready.', notification_time: '5 hours ago' },
  { text: 'Your password was changed successfully.', notification_time: '8 hours ago' },
  { text: 'App update version 2.1.0 is now available.', notification_time: '12 hours ago' },
  { text: 'You earned 50 reward points.', notification_time: '1 day ago' },
  { text: 'Backup completed successfully.', notification_time: '2 days ago' },
  { text: 'Subscription renewed successfully.', notification_time: '3 days ago' },
  { text: 'Security alert: Login from a new device.', notification_time: '5 days ago' },
  { text: 'New comment on your post.', notification_time: '7 days ago' },
  { text: 'Invoice #4567 is ready for download.', notification_time: '10 days ago' },
  { text: 'System maintenance scheduled for Sunday.', notification_time: '12 days ago' },
  { text: 'Friend request from Alex Morgan.', notification_time: '15 days ago' },
];
