import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './navigationHelper';
import { Routes, RouteScreens } from './route';
import FlashMessage from 'react-native-flash-message';
import '../utils/ignoreWarnings';
import { Colors, Constants, ImageView, StorageKey, Strings } from '@constants';
import type { ImageSourcePropType } from 'react-native';
import { Image, View, TouchableOpacity } from 'react-native';
import { Button, ModalView, Text, CustomDrawer } from '@components';
import c from '@style';
import styles from './styles';
import { AuthData } from '@/types/global';
import { PrefManager } from '@/utils';

const RootStack = createNativeStackNavigator();

const NavigatorStack = (): React.ReactElement => {
  const [index, setIndex] = useState(0);
  const Drawer = createDrawerNavigator();

  const renderDrawerLabel = (label: string) => () => (
    <Text title={label} style={c.drawerTitle} />
  );
  
  const renderDrawerIcon = (icon: ImageSourcePropType) => () => (
    <Image source={icon} style={c.img20} />
  );

  const createDrawerScreenOptions = (label: string, icon: ImageSourcePropType) => ({
    drawerLabelStyle: { marginLeft: -6 },
    drawerLabel: renderDrawerLabel(label),
    drawerIcon: renderDrawerIcon(icon),
  });

  const drawerNavigatorScreen = {
    drawerActiveBackgroundColor: Colors.white,
    drawerActiveTintColor: Colors.grey,
    drawerInactiveBackgroundColor: Colors.white,
    drawerInactiveTintColor: Colors.grey,
    drawerStyle: {
      width: Constants.width * 0.88,
      borderBottomRightRadius: 35,
    },
    headerShown: false,
    overlayColor: Colors.transparent,
  };

  const DrawerStack = async () => {
    const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
    return (
      <Drawer.Navigator
        drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
        initialRouteName={authData.type_id == 4 ? Routes.Order : Routes.Home}
        screenOptions={drawerNavigatorScreen}
      >
        <Drawer.Screen
          name={Routes.Home}
          component={RouteScreens[Routes.Home]}
          options={createDrawerScreenOptions(Strings.home, ImageView.workRequest)}
        />

        <Drawer.Screen
          name={Routes.DayStatus}
          component={RouteScreens[Routes.DayStatus]}
          options={createDrawerScreenOptions(Strings.startMyDay, ImageView.startDay)}
        />

        <Drawer.Screen
          name={Routes.AddNewCall}
          component={RouteScreens[Routes.AddNewCall]}
          options={createDrawerScreenOptions(Strings.addNewCall, ImageView.back)}
        />

        <Drawer.Screen
          name={Routes.Order}
          component={RouteScreens[Routes.Order]}
          options={createDrawerScreenOptions(Strings.order, ImageView.back)}
        />

        <Drawer.Screen
          name={Routes.Sales}
          component={RouteScreens[Routes.Sales]}
          options={createDrawerScreenOptions(Strings.sales, ImageView.back)}
        />

        <Drawer.Screen
          name={Routes.ViewItems}
          component={RouteScreens[Routes.ViewItems]}
          options={createDrawerScreenOptions(Strings.viewItem, ImageView.back)}
        />

        <Drawer.Screen
          name={Routes.LeaveList}
          component={RouteScreens[Routes.LeaveList]}
          options={createDrawerScreenOptions(Strings.manageLeave, ImageView.manageLeave)}
        />

        <Drawer.Screen
          name={Routes.UpdateSignature}
          component={RouteScreens[Routes.UpdateSignature]}
          options={createDrawerScreenOptions(Strings.updateSignature, ImageView.signature)}
        />

        <Drawer.Screen
          name={Routes.Notification}
          component={RouteScreens[Routes.Notification]}
          options={createDrawerScreenOptions(Strings.sales, ImageView.back)}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <RootStack.Screen name={Routes.Splash} component={RouteScreens[Routes.Splash]} />
        <RootStack.Screen name={Routes.Intro} component={RouteScreens[Routes.Intro]} />
        <RootStack.Screen name={Routes.Login} component={RouteScreens[Routes.Login]} />
        <RootStack.Screen name={Routes.SignUp} component={RouteScreens[Routes.SignUp]} />
        <RootStack.Screen name={Routes.Payment} component={RouteScreens[Routes.Payment]} />
        <RootStack.Screen name={Routes.Home} component={DrawerStack} />
        <RootStack.Screen name={Routes.Order} component={DrawerStack} />
        <RootStack.Screen name={Routes.UpdateSignature} component={RouteScreens[Routes.UpdateSignature]} />
        <RootStack.Screen name={Routes.FormStack} component={RouteScreens[Routes.FormStack]} />
        <RootStack.Screen name={Routes.AddOrder} component={RouteScreens[Routes.AddOrder]} />
        <RootStack.Screen name={Routes.OrderDetails} component={RouteScreens[Routes.OrderDetails]} />
        <RootStack.Screen name={Routes.DayStatus} component={RouteScreens[Routes.DayStatus]} />
        <RootStack.Screen name={Routes.RequestLeave} component={RouteScreens[Routes.RequestLeave]} />
        <RootStack.Screen name={Routes.CallTransfer} component={RouteScreens[Routes.CallTransfer]} />
        <RootStack.Screen name={Routes.Sales} component={RouteScreens[Routes.Sales]} />
        <RootStack.Screen name={Routes.AddCompany} component={RouteScreens[Routes.AddCompany]} />
        <RootStack.Screen name={Routes.Notification} component={RouteScreens[Routes.Notification]} />
      </RootStack.Navigator>
      <FlashMessage position="top" />

      <ModalView
        visible={false}
        onClose={() => {
          navigationRef.navigate(Routes.Login);
        }}>
        <View style={c.flex1P}>
          <View style={styles.headerBelowStyle}>
            <Image
              style={styles.ImageHeightWidth}
              source={{
                uri: 'https://trader2b.com/wp-content/uploads/2022/02/image-82-1.png',
              }}
            />
          </View>

          <View style={styles.freeTrialTextStyle}>
            <Text title={Strings.freeTrialExpMsg} style={c.navTitle} />

            <TouchableOpacity
              onPress={() => {
                setIndex(1);
              }}
            // style={[
            //   c.box1,
            //   {
            //     elevation: index === 1 ? 3 : 0,
            //     borderColor: index === 1 ? Colors.primary : Colors.light_gray,
            //   },
            // ]}
            >
              <View style={c.flexRowSpaceBetweenPadding12}>
                <View style={styles.gap12}>
                  <Text title={Strings.yearlyText} style={c.textBold} />

                  <Text title={`₹${50}/-`} style={c.textSemiBold14} />
                </View>

                {index === 1 && (
                  <View>
                    <View style={styles.imageViewStyle}>
                      <Image style={c.img16} source={ImageView.tick} />
                    </View>
                  </View>
                )}
              </View>

              <View />
            </TouchableOpacity>

            <View style={c.h12} />

            <TouchableOpacity
              onPress={() => setIndex(2)}
            // style={[
            //   c.box1,
            //   {
            //     elevation: index === 2 ? 3 : 0,
            //     borderColor: index === 2 ? Colors.primary : Colors.light_gray,
            //   },
            // ]}
            >
              <View style={c.flexRowSpaceBetweenPadding12}>
                <View style={styles.gap12}>
                  <Text title={Strings.monthly} style={c.textBold} />
                  <Text title={`₹${50}/-`} style={c.textSemiBold14} />
                </View>

                {index === 2 && (
                  <View>
                    <View style={styles.imageViewStyle}>
                      <Image style={c.img16} source={ImageView.tick} />
                    </View>
                  </View>
                )}
              </View>

              <View />
            </TouchableOpacity>

            <Text
              top={4}
              left={10}
              title={`* ₹${1000}/-   ${Strings.oneTimefeeMsg}`}
              style={c.setupTextStyle}
            />

            <Button
              loading={false}
              onPress={() => { }}
              textColor={Colors.white}
              style={c.buttonStyle}
              text={'Buy'}
            />
          </View>
        </View>
      </ModalView>
    </NavigationContainer>
  );
};
export default NavigatorStack;
