import React from 'react';
import { View } from 'react-native';
import { Header } from '@components';
import c from '@style';
import { Routes, RouteScreens } from '../../../navigation/route';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps } from '@/navigation/navigation';

const FormStack = ({ navigation, route }: NavigationProps) => {

  const { data, from, } = route.params;

  const goBack = () => navigation.goBack();
  const Stack = createNativeStackNavigator();
  const headerName = `Call-${data?.call_no ?? '-'}`;

  return (
    <View style={c.flex1W}>
      <Header
        isBack
        onPress={goBack}
        title={headerName} />

      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right', }}>
        <Stack.Screen
          name={Routes.Details}
          children={(props) => {
            const Component = RouteScreens[Routes.Details];
            return <Component {...props} callInfoProps={data} from={from} />;
          }}
        />
        <Stack.Screen
          name={Routes.Form}
          children={(props) => {
            const Component = RouteScreens[Routes.Form];
            return <Component {...props} callInfoProps={data} />;
          }}
        />
        <Stack.Screen
          name={Routes.Attachment}
          children={(props) => {
            const Component = RouteScreens[Routes.Attachment];
            return <Component {...props} callInfoProps={data} />;
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default FormStack;
