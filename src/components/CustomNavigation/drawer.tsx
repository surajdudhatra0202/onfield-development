import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import c from '@style';
import { DELETE, getLoginDetails, isLogout, LOGIN, PrefManager, showPopupMessage } from '@utils';
import { Colors, Fonts, ImageView, StorageKey, Strings } from '@constants';
import type { ImageStyle } from 'react-native';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Routes } from '../../navigation/route';
import Text from '../Text';
import { styles } from './styles';
import Loader from '../Spinner/loader';
import { Post } from '@/services';
import { ApiResponse, AuthData } from '@/types/global';
import ConfirmationModal from '../Modal/confirmationModal';

interface menuActionProps {
  nav: string;
  name: string;
}

const ListHeaderComponent = () => {
  return <View style={styles.drawerHeightBorder} />;
};

const deleteAccount = { name: 'Delete My Account', nav: 'delete', icon: 'delete' };

const CustomDrawer = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const drawerList = [...getLoginDetails().drawerMenu, deleteAccount];
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState('');

  // console.log('props', props);
  // console.log('drawerlist', ...getLoginDetails().drawerMenu);

  const menuAction = (item: menuActionProps, index: number) => {
    // console.log(Strings.endMyDay);
    console.log('item props', item.nav);

    if (item.nav === 'delete') {
      Alert.alert(
        'Delete Account',
        'This action is irreversible. Are you sure you want to delete your account?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: deleteMyAccount,
          },
        ],
        { cancelable: true },
      );
    } else if (item.name === Strings.endMyDay) {
      setCurrentAction('Clock Out');
      setModalVisible(true);
      // props.navigation.navigate(Routes.DayStatus, { data: item });
      console.log(Routes.DayStatus, { data: item });
    } else if (item.nav === Strings.logout) {
      // isLogout();
      setCurrentAction('logout');
      setModalVisible(true);
    } else {
      props.navigation.navigate(item.nav);
    }
    setActiveMenu(index);
  };

  const deleteMyAccount = async () => {
    try {
      setLoading(true);
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
      };
      const { data, message } = (await Post(DELETE, request)) as ApiResponse;

      if (data.status) {
        isLogout();
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const varifyAction = () => {
    setModalVisible(true);

    if (currentAction === 'logout') {
      isLogout();
    } else if (currentAction === 'Clock Out') {
      props.navigation.navigate(Routes.DayStatus, { data: { name: Strings.endMyDay } });
    }

    setModalVisible(false);
    setCurrentAction('')
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{}} onPress={() => menuAction(item, index)}>
        <LinearGradient
          colors={
            index === activeMenu
              ? ['rgba(237, 237, 237, 0.40)', 'rgba(237, 237, 237, 0.10)', 'rgba(237, 237, 237, 0)']
              : [Colors.transparent, Colors.transparent]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.itemStyle}
        >
          <View style={styles.manuItemStyle}>
            <Icon
              color={index === activeMenu ? Colors.primary : Colors.white}
              name={item.icon}
              size={26}
            />
            <Text
              fontFamily={index === activeMenu ? Fonts.SemiBold : Fonts.Regular}
              title={item.name}
              style={c.textRegularWhite}
            />
          </View>

          <Image
            resizeMode="contain"
            source={index === activeMenu ? ImageView.activeArrowRight : ImageView.arrowRight}
            style={c.img25}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex1}>
      <DrawerContentScrollView style={styles.m5} {...props}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle as ImageStyle}
          source={ImageView.logoWhite}
        />
        <View style={styles.drawerBelowLogo} />

        <FlatList
          style={c.flex1}
          data={drawerList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListHeaderComponent}
          scrollEnabled={false}
        />
      </DrawerContentScrollView>

      {ListHeaderComponent()}

      <TouchableOpacity
        onPress={() => {
          setCurrentAction('logout');
          setModalVisible(true);
        }}
        style={styles.listHeader}
      >
        <View style={c.flexRow}>
          <Image resizeMode="contain" source={ImageView.profile} style={c.img70} />
          <Text title="Rahul" style={c.textBoldWhite} />
        </View>
        <Image resizeMode="contain" source={ImageView.logout} style={c.img30} />
      </TouchableOpacity>

      <ConfirmationModal
        visible={modalVisible}
        onYes={varifyAction}
        onNo={() => {setModalVisible(false), setCurrentAction('')}}
        message={ currentAction === 'logout' ? "Are you want to logout ?" : "Are you want end your day ?"}
      />
      {/* <ConfirmationModal visible={modalVisible} onYes={() => {setModalVisible(true); isLogout();}} onNo={() => setModalVisible(false)} message='Are you want to logout ?'  /> */}
      <Loader visible={loading} />
    </View>
  );
};

export default CustomDrawer;
