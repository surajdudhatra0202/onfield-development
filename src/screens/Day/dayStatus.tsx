import { View, Text as T, Animated, Easing, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Header, Text } from '@components';
import c from '@style';
import { Colors, Dimens, ImageView, StorageKey, Strings } from '@constants';
import styles from './styles';
import moment from 'moment';
import { getLocation, showPopupMessage, END_DAY, START_DAY, PrefManager } from '@utils';
import { Post } from '@services';
import { NavigationProps } from '@/navigation/navigation';
import { ApiResponse, AuthData } from '@/types/global';

const cTime = moment(new Date()).format('hh:mm');

const EndMyDay = ({ navigation, route }: NavigationProps) => {
  const type = route?.params?.status
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [currentTime, setCurrentTime] = useState(cTime)
  const [loading, setLoading] = useState(false)

  const fetchAndStoreLocation = async (from: string) => {
    const coords = await getLocation();
    if (coords) {
      setLat(coords.latitude.toString());
      setLong(coords.longitude.toString());
      if (from === 'toLogin') {
        onNext('stop', coords.latitude.toString(), coords.longitude.toString());
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment(new Date()).format('hh:mm'))
    }, 30000);
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    fetchAndStoreLocation('useEffect');
  }, []);

  const startDay = async (flag: string, lat: string, long: string) => {
    try {
      if (lat.length === 0 || long.length === 0) {
        setLoading(true)
        if (flag !== 'stop') {
          await fetchAndStoreLocation('toLogin');
        }
        setLoading(false)
      } else {
        setLoading(true)
        const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
        const request = {
          user_id: authData.id,
          ...(
             type !== 'start' ?
             { e_lat_lon: `${lat},${long}`}
             :
             { s_lat_lon: `${lat},${long}`}
          )
        };
        const URL = type !== 'start' ? END_DAY : START_DAY;
        const { data, message } = await Post(URL, request) as ApiResponse;

        if (data.status) {
          setLoading(false);
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
          showPopupMessage(Strings.error, data?.message ?? message, true);
        }
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  }

  const onNext = async (flag: string, lat: string, long: string): Promise<void> => {

    Alert.alert(
      'Start your day',
      'Are you wnat to start your day ?',
      [
        {
          text: 'No',
          onPress: () => console.log("No pressed"),
          // style: 'cancle',
        },
        {
          text: 'Yes',
          onPress: () => startDay(flag, lat, long)
        } 
      ],
      { cancelable: true }
    )
  }

  // For Animated Image Circle
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const openDrawer = () => navigation.openDrawer();
  // console.log("day");


  return (
    <View style={c.flex1}>
      <Header
        hide={type !== 'start'}
        onPress={openDrawer}
        title={Strings.dayStatus}
      />
      <ImageBackground source={ImageView.dayBg} style={styles.dayBgImageStyle}>
        <View style={c.h100} />
        <View style={styles.middleTimeSection}>
          <View style={c.flexRow}>
            <Text
              title={currentTime}
              size={Dimens.f24}
              left={12}
              right={6}
              color={Colors.white}
              style={c.textBold}
            />
            <Text title={`${moment(new Date()).format('a')}`} style={styles.amPmText} />
          </View>
          <Text
            color={Colors.white}
            title={`${moment(new Date()).format('dddd')}`}
            style={c.textRegular14}
          />
          <Text
            color={Colors.white}
            title={`${moment(new Date()).format('DD MMM YYYY')}`}
            style={c.textSemiBold14}
          />
        </View>

        <View style={styles.timePageMain}>
          <Animated.Image
            resizeMethod={'scale'}
            source={ImageView.outerRingNewFinal}
            style={[styles.outerRingStyle, { transform: [{ rotate: rotateInterpolate }] }]}
          />

          <View style={c.h100} />

          <T style={styles.lowerText}>
            <Text
              title={
                type !== 'start' ? Strings.clockInStartedMsg : Strings.clockInMsg
              }
              style={c.textRegular14White}
            />
          </T>

          <Button
            top={40}
            loading={loading}
            onPress={() => {
              onNext('', lat, long)
            }}
            textColor={Colors.white}
            style={styles.buttonStylePayment}
            text={'Start day'}
            icon={type !== 'start' ? 'power' : 'arrow-right'}
            bgColor={type !== 'start' ? Colors.primary : Colors.primary}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default EndMyDay;
