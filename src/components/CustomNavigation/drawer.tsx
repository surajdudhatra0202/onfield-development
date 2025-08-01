import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import c from '@style';
import {
  CALLS,
  DELETE,
  END_DAY,
  getLocation,
  getLoginDetails,
  isLogout,
  LOGIN,
  PrefManager,
  showPopupMessage,
} from '@utils';
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
import CallTransfer from '@/screens/Call/callTransfer';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState('');
  const [callData, setCallData] = useState(null);

  const getCallDetail = async (authData: AuthData) => {
    try {
      const requestCallDetails = {
        user_id: authData.id,
        type: 1,
        page: 1,
      };

      const { data } = (await Post(CALLS, requestCallDetails)) as ApiResponse;
      const callCount = data?.data?.calls?.length;
      setCallData(data);

      return callCount;
    } catch (error) {
      console.error('Err to fetch call details ');
      return showPopupMessage(Strings.error, String(error), true);
    }
  };

  const menuAction = (item: menuActionProps, index: number) => {
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
      setModalVisible(true);
      setCurrentAction('Clock Out');
    } else if (item.nav === Strings.logout) {
      setModalVisible(true);
      setCurrentAction('logout');
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

  const fetchAndStoreLocation = async () => {
    const coords = await getLocation();

    if (coords) {
      const lat = coords.latitude.toString();
      const long = coords.longitude.toString();

      return { lat, long };
    } else {
      console.log('unable to fetch cordinates');
      return null;
    }
  };

  const callTransferPopup = () => {
    props.navigation.navigate(Routes.CallTransfer, { callData: callData }); 
  };

  const varifyAction = async () => {
    setLoading(true);

    const location = await fetchAndStoreLocation();

    if (!location) {
      setLoading(false);
      showPopupMessage(Strings.error, 'Failed to fetch location', true);
      return;
    }

    const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);

    const request = {
      user_id: authData.id,
      e_lat_lon: `${location.lat},${location.long}`,
    };

    if (currentAction === 'logout') {
      isLogout();
      setModalVisible(false);
      setCurrentAction('');
      setLoading(false);
    } else if (currentAction === 'Clock Out') {
      const callCount = await getCallDetail(authData);

      if (callCount > 0) {
        showPopupMessage(Strings.callIncomplete, callCount, Colors.accent);
        setCurrentAction('call transfer');
        setModalVisible(true);
        setLoading(false);

        props.navigation.navigate(Routes.Home);

        // setTimeout(() => {
        //   callTransferPopup();
        // }, 100);

        return;
      } else {
        props.navigation.navigate(Routes.DayStatus, { data: { name: Strings.endMyDay } });

        const { data, message } = (await Post(END_DAY, request)) as ApiResponse;
        setModalVisible(false);
        setCurrentAction('');
        setLoading(false);
      }
    } else if (currentAction === 'call transfer') {
      setModalVisible(false);
      setCurrentAction('');
      callTransferPopup()
      setLoading(false);
    }
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
        loading={loading}
        visible={modalVisible}
        onYes={varifyAction}
        onNo={() => {
          setModalVisible(false), setCurrentAction('');
        }}
        message={
          currentAction === 'logout'
            ? 'Are you want to logout ?'
            : currentAction === 'Clock Out'
              ? 'Are you want end your day ?'
              : 'Are you want to transfer call to another day ?'
        }
      />
      <Loader visible={loading} />
    </View>
  );
};

export default CustomDrawer;
