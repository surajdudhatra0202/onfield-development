import React from 'react';
import { TabBar } from '@/components';
import { View } from "react-native";
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import c from '@/style';
import PaginatedList from './paginatedList';

interface tabScreens {
  name: string;
  type: number;
  apiEndPoint: string;
  dataLabel: string;
}

interface TabListProps {
  renderItem: React.ReactNode;
  tabScreens: tabScreens[];
  enableUseFocusEffect?: boolean
};

const TabListScreen = ({
  tabScreens,
  renderItem,
  enableUseFocusEffect
}: TabListProps) => {


  const renderTabBar = (props: MaterialTopTabBarProps) => <TabBar {...props} />;
  const Tab = createMaterialTopTabNavigator();


  return (
    <View style={c.flex1W}>
      <Tab.Navigator
        lazy
        screenOptions={{ unmountOnBlur: true }}
        tabBar={renderTabBar}>

        {tabScreens && tabScreens.length > 0 && tabScreens.map((tab, index) => (
          <Tab.Screen
            key={tab.name + index}
            name={tab.name}
            children={(props) => (
              <PaginatedList
                {...props}
                type={tab.type}
                apiEndPoint={tab.apiEndPoint}
                dataLabel={tab.dataLabel}
                enableUseFocusEffect={enableUseFocusEffect}
                renderItem={({item,index}) => renderItem({item,index, tab})}
              />
            )}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default TabListScreen;