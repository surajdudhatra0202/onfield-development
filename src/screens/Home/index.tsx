import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, TouchableOpacity, View } from 'react-native';
import TabListScreen from '../Shared/List/tabList';
import { Header, ListItem } from '@components';
import c from '@style';
import { Colors, ImageView, Strings } from '@constants';
import type { NavigationProps } from '@/navigation/navigation';
import { CALLS } from '@/utils';
import ChatBot from './chatBot';
import { Routes } from '@/navigation/route';

const tabScreens = [
  {
    name: Strings.todayCallLabel,
    type: 1,
    apiEndPoint: CALLS,
    dataLabel: "calls",
  },
  {
    name: Strings.futureText,
    type: 3,
    apiEndPoint: CALLS,
    dataLabel: "calls",
  },
  {
    name: Strings.completedText,
    type: 2,
    apiEndPoint: CALLS,
    dataLabel: "calls",
  },
]

const Home = ({ navigation }: NavigationProps) => {
  const [chatEnable, setChatEnable] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const chatButtonAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = () => navigation.openDrawer();
  

  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    // Start floating button animation
    Animated.spring(chatButtonAnim, {
      toValue: 1,
      friction: 3,
      tension: 150,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = ({ item, tab }) => (
    <ListItem
      status={item.priority}
      srNo={item.call_no}
      label={'Company'}
      value={item.customer}
      date={item.l_date}
      onPress={() => navigation.navigate(Routes.FormStack, { data: item, from: tab?.type })}
    />
  );

  return (
    <View style={c.flex1W}>
      <Header image onPress={openDrawer} />

      <TabListScreen
        renderItem={renderItem}
        tabScreens={tabScreens}
      />

      <Animated.View style={[c.floatingStyle, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={() => {
            setChatEnable(true);
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }}>
          <Image
            source={ImageView.botNew}
            resizeMode="contain"
            tintColor={Colors.white}
            style={c.img30}
          />
        </TouchableOpacity>
      </Animated.View>

      <ChatBot
        chatEnable={chatEnable}
        onClose={() => setChatEnable(false)}
      />
    </View>
  );
};

export default Home;