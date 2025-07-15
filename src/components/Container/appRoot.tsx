import { Colors } from '@constants';
import c from '@style';
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { s } from './styles';

interface AppRootProps {
  children: React.ReactNode;
}

const AppRoot: React.FC<AppRootProps> = ({ children }) => {
  return (
    <View style={c.flex1}>
      <SafeAreaView style={s.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} />
        <View style={c.flex1}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default AppRoot;
