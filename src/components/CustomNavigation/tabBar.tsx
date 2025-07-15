import { Colors } from '@/constants';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import c from '@style';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text';

const TabBar: React.FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={c.flexRow as StyleProp<ViewStyle>}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label: string;
        if (typeof options.tabBarLabel === 'string') {
          label = options.tabBarLabel;
        } else if (typeof options.title === 'string') {
          label = options.title;
        } else {
          label = route.name;
        }
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.key} style={c.flex1}>
            <TouchableOpacity
              accessibilityRole={'button'}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tabStyle(isFocused)}
            >
              <Text
                title={label}
                textAlign={'center'}
                color={isFocused ? Colors.white : Colors.primary}
                style={c.textRegular14}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;

const tabStyle = (bool: boolean): ViewStyle => ({
  backgroundColor: bool ? Colors.primary : Colors.light,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 6,
  paddingVertical: 4,
  borderRadius: 8,
});
