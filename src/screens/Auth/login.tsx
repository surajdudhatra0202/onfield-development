import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button, KeyboardAvoidingView } from '@components';
import { Colors, ImageView, Strings } from '@constants';
import c from '@style';
import s from './styles';
import { Post } from '@services';
import { getLocation, showPopupMessage, storeAuthData, LOGIN, emptyValidator, emailValidator } from '@utils';
import DeviceInfo from 'react-native-device-info';
import { useLoginForm } from '@hooks';
import { Routes } from '../../navigation/route';
import type { NavigationProps } from '@/navigation/navigation';
import { ApiResponse } from '@/types/global';
import styles from './styles';

const Login: React.FC<NavigationProps> = ({ navigation }) => {

  const shape1Anim = useRef(new Animated.Value(-100)).current;
  const shape2Anim = useRef(new Animated.Value(100)).current;

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const { form, handleChange } = useLoginForm({
    email: '',  //rahul@gmail.com
    password: '',
    loading: false,
    passHide: true,
    isSelected: false,
  });

  const fetchAndStoreLocation = async (from: string) => {
    const coords = await getLocation();
    if (coords) {
      setLat(coords.latitude.toString());
      setLong(coords.longitude.toString());
      if (from === 'toLogin') {
        toLogin('stop', coords.latitude.toString(), coords.longitude.toString());
      }
    } else {
      handleChange('loading', false);
    }
  };
  
  useEffect(() => {
    fetchAndStoreLocation('useEffect');
  }, []);

  useEffect(() => {
    // Parallel animation
    Animated.parallel([
      Animated.timing(shape1Anim, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shape2Anim, {
        toValue: 0,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shape1Anim, shape2Anim]);


  const toLogin = async (flag:string,lat: string,long: string): Promise<void> => {
    const emailError = emptyValidator(form.email, Strings.email) || emailValidator(form.email);
    const passwordError = emptyValidator(form.password, Strings.password);

    if (emailError) {
      showPopupMessage(Strings.error, emailError, true);
      return;
    }

    if (passwordError) {
      showPopupMessage(Strings.error, passwordError, true);
      return;
    }

    if (!lat || !long) {
      handleChange('loading', true);
      if (flag !== 'stop') {
        await fetchAndStoreLocation('toLogin');
      }
      handleChange('loading', false);
      return;
    }

    try {
      handleChange('loading', true);
      const brand = DeviceInfo.getBrand();
      const deviceId = DeviceInfo.getDeviceId();

      const request = {
        email: form.email,
        password: form.password,
        lat: lat,
        long: long,
        device: `${brand}|${deviceId}`,
      };

      const { data, message } = await Post(LOGIN, request) as ApiResponse;

      if (data.status) {
        storeAuthData(data);
        const routeName = data?.data?.type_id === 4 ? Routes.Order : data?.data?.day_started === 1 ? Routes.Home :  Routes.DayStatus; //Home 
        navigation.reset({
          index: 0,
          routes: [
            {
              name: routeName,
              params: { status: 'start' },
            },
          ],
        });
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      handleChange('loading', false);
    }
  };

  const selectBox = () => {
    handleChange('isSelected', !form.isSelected);
  };

  const passShow = () => {
    handleChange('passHide', !form.passHide);
  };

  const bind = (name: keyof typeof form) => ({
    value: String(form[name]),
    onChangeText: (text: string) => handleChange(name, text.replace(/\s/g, '')),
  });

  const NavToForgot = () => {}; //navigation.navigate(Routes.ForgotPassword)
  const navToSignUp = () => navigation.navigate(Routes.SignUp);

  return (
    <SafeAreaView edges={['bottom']} style={c.flex1W}>
      <Image resizeMode="contain" source={ImageView.logoDark} style={s.logoStyle} />

      <KeyboardAvoidingView keyboardShouldPersistTaps="always">
        <Text title={Strings.login} style={s.textBold22} />

        <View style={s.marginH20}>
          <Input
            icon={'email'}
            title={Strings.email + ' *'}
            placeholder={Strings.email}
            keyboardType={'email-address'}
            inputStyle={c.inputStyle}
            {...bind('email')}
          />

          <Input
            icon={'lock'}
            title={Strings.password}
            icon2={form.passHide ? 'eye-off' : 'eye'}
            placeholder={Strings.pwd}
            secureTextEntry={form.passHide}
            showPass={passShow}
            inputStyle={c.inputStyle}
            rightIconStyle={c.rightIconStyle}
            {...bind('password')}
          />

          <View style={[c.flexRowSpaceBetweenPadding0, c.marginT6]}>
            <View style={s.flexRowSpaceBetween}>
              <Icon
                onPress={selectBox}
                style={c.alignSelf}
                name={form.isSelected ? 'checkbox-marked' : 'square-rounded-outline'}
                color={Colors.accent}
                size={24}
              />
              <Text title={Strings.remember} style={s.label} />
            </View>

            <TouchableOpacity onPress={NavToForgot} style={s.checkBtn}>
              <Text title={Strings.forgot} style={s.label} />
            </TouchableOpacity>
          </View>

          <View style={[c.flexRow, s.signUpBtn]}>
            <Button
              loading={form.loading}
              onPress={()=>{
                toLogin('',lat,long)
              }}
               
              textColor={Colors.white}
              style={styles.buttonStyle}
              text={Strings.signIn}
            />

            {/* <TouchableOpacity style={s.googleButtonStyle}>
              <Image style={c.img25} source={ImageView.google} />
            </TouchableOpacity> */}
          </View>

          <View style={s.rowCenter}>
            <Text title={Strings.notAccount} style={s.notAcTextStyle} />
            <Text title={Strings.signUp} style={s.textButtonStyle} onPress={navToSignUp} />
          </View>
        </View>
      </KeyboardAvoidingView>

      <Animated.Image
        source={ImageView.shape1}
        resizeMode="contain"
        style={[
          s.shap1Style,
          {
            transform: [{ translateY: shape1Anim }],
          },
        ]}
      />

      <Animated.Image
        source={ImageView.shape2}
        resizeMode="contain"
        style={[
          s.shap2Style,
          {
            transform: [{ translateY: shape2Anim }],
          },
        ]}
      />
    </SafeAreaView>
  );
};
export default Login;
