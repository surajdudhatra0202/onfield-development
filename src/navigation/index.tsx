import React, { useEffect } from 'react';
import NavigatorStack from './navigatorStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, TextInput, Text, View } from 'react-native';
import { Colors } from '@constants';
import c from '@style';
import { FontScalableComponent } from '@/types/global';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App(): React.ReactElement {
  
  const disableFontScaling = <T extends FontScalableComponent>(component: T): void => {
    if (!component.defaultProps) {
      component.defaultProps = {};
    }
    component.defaultProps.allowFontScaling = false;
  };

  useEffect(() => {
    disableFontScaling(Text);
    disableFontScaling(TextInput);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={c.flex1}>
        <StatusBar backgroundColor={Colors.primary} />
        <SafeAreaView style={c.flex1P}>
          <BottomSheetModalProvider>
            <View style={c.flex1W}>
              <NavigatorStack />
            </View>
          </BottomSheetModalProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
