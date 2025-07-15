import React, { useEffect, useState, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import s from './styles';
import { AppRoot, Button, Input, KeyboardAvoidingView, Text } from '@components';
import { Colors, ImageView, Strings } from '@constants';
import c from '@style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Post } from '@services';
import { getLocation, showPopupMessage, REGISTER, SOCIAL_LOGIN, storeAuthData, emptyValidator, emailValidator } from '@utils';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Routes } from '../../navigation/route';
import { useSignUpForm } from '@hooks';
import type { NavigationProps } from '@/navigation/navigation';
import { ApiResponse } from '@/types/global';
import styles from './styles';

const SignUp = ({ navigation }: NavigationProps) => {
  const [passHide, setPassHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const shape1Anim = useRef(new Animated.Value(-100)).current;
  const shape2Anim = useRef(new Animated.Value(100)).current;

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const { form, handleChange } = useSignUpForm({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

  const fetchAndStoreLocation = async (from: string, user?: any) => {
    const coords = await getLocation();
    if (coords) {
      setLat(coords.latitude.toString());
      setLong(coords.longitude.toString());
      if (from === 'toLogin') {
        toLogin('stop', user, coords.latitude.toString(), coords.longitude.toString());
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndStoreLocation('useEffect', {});
  }, []);

  // useEffect(() => {
  //   function init() {
  //     GoogleSignin.configure({
  //       webClientId: '398476997671-vlhhlpdi3ii7mnhc0prunst5sgu3kvhn.apps.googleusercontent.com',
  //     });
  //   }
  //   init();
  // }, []);

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

  const toLogin = async (flag: string, user: { email: string }, lat: string, long: string): Promise<void> => {
    try {
      if (lat.length === 0 || long.length === 0) {
        if (flag !== 'stop') {
          await fetchAndStoreLocation('toLogin', user);
        }
      } else {
        setLoading(true);

        const brand = DeviceInfo.getBrand();
        const deviceId = DeviceInfo.getDeviceId();
        const request = {
          email: user?.email,
          lat: lat,
          long: long,
          device: `${brand}|${deviceId}`,
        };

        const { data, message } = await Post(SOCIAL_LOGIN, request) as ApiResponse;
        if (data.status) {
          storeAuthData(data)
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
  };

  const GL = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo?.data?.user);

      if (userInfo?.data?.user) {
        toLogin('', userInfo?.data?.user, lat, long);
      } else {
        showPopupMessage(Strings.error, Strings.googleLoginFailed, true);
      }
    } catch (error) {
      console.log('Test', error);
    }
  };

  const onNext = async () => {
    try {
      const emailError = emptyValidator(form.email, Strings.email) || emailValidator(form.email);
      const passwordError = emptyValidator(form.password, Strings.password);
      const nameError = emptyValidator(form.name, Strings.name)
      const mobileNoError = emptyValidator(form.mobile, Strings.mnum) || (form.mobile?.length !== 10 && Strings.vemobnum)

      if (emailError) {
        showPopupMessage(Strings.error, emailError, true);
        return;
      }
      if (passwordError) {
        showPopupMessage(Strings.error, passwordError, true);
        return;
      }
      if (nameError) {
        showPopupMessage(Strings.error, nameError, true);
        return;
      }
      if (mobileNoError) {
        showPopupMessage(Strings.error, mobileNoError, true);
        return;
      }

      if (!isSelected) {
        showPopupMessage(Strings.error, Strings.pleaseAcceptTerms, true)
        return;
      }

      setLoading(true);

      const request = {
        name: form.name,
        email: form.email,
        password: form.password,
        mobile: form.mobile,
        type: Strings.email.toLocaleLowerCase(),
      };
      const { data, message } = await Post(REGISTER, request) as ApiResponse;

      if (data.status) {
        navigation.navigate(Routes.Payment, { data: data, name: form.name });
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    }
    catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const bind = (name: keyof typeof form) => ({
    value: String(form[name]),
    onChangeText: (text: string) => handleChange(name, text.replace(/\s/g, '')),
  });

  const passShow = () => setPassHide(!passHide);
  const selectBox = () => setSelection(!isSelected);

  const navToLogin = () => navigation.navigate(Routes.Login);

  return (
    <AppRoot>
      <Image resizeMode="contain" source={ImageView.logoDark} style={s.logoStyle} />

      <KeyboardAvoidingView keyboardShouldPersistTaps="always">
        <Text title={Strings.letsGetStartText} style={s.textBold22} />

        <View style={s.marginH20}>
          <Input
            icon={'account'}
            title={Strings.name + ' *'}
            placeholder={Strings.name}
            inputStyle={c.inputStyle}
            keyboardType="email-address"
            {...bind('name')}
          />

          <Input
            icon={'email'}
            title={Strings.email + ' *'}
            placeholder={Strings.email}
            inputStyle={c.inputStyle}
            keyboardType="email-address"
            {...bind('email')}
          />

          <Input
            icon={'phone'}
            maxLength={10}
            title={Strings.mnum + ' *'}
            placeholder={Strings.mnum}
            inputStyle={c.inputStyle}
            keyboardType={'number-pad'}
            {...bind('mobile')}
          />

          <Input
            icon={'lock'}
            title={Strings.password}
            icon2={passHide ? 'eye-off' : 'eye'}
            placeholder={Strings.pwd}
            secureTextEntry={passHide}
            showPass={passShow}
            inputStyle={c.inputStyle}
            rightIconStyle={c.rightIconStyle}
            {...bind('password')}
          />

          <View style={s.flexRow}>
            <Icon
              onPress={selectBox}
              name={isSelected ? 'checkbox-marked' : 'square-rounded-outline'}
              color={Colors.accent}
              size={24}
            />

            <View style={c.flexRowWrap}>
              <Text title={Strings.agreeText} textAlign={'left'} size={11} style={s.label} />
              <Text
                title={Strings.termsText}
                textAlign={'left'}
                size={12}
                left={2}
                right={2}
                color={Colors.accent}
                style={s.label}
              />
              <Text title={Strings.andText} textAlign={'left'} size={11} style={s.label} />

              <Text
                title={Strings.privacypolicytext}
                textAlign={'left'}
                color={Colors.accent}
                size={12}
                left={2}
                style={s.label}
              />
            </View>
          </View>

          <View style={[c.flexRow, s.signUpBtn]}>
            <Button
              loading={loading}
              text={Strings.signUp}
              onPress={onNext}
              textColor={Colors.white}
              style={styles.buttonStyle}
            />

            {/* <TouchableOpacity onPress={GL} style={s.googleButtonStyle}>
              <Image style={c.img25} source={ImageView.google} />
            </TouchableOpacity> */}
          </View>

          <View style={s.rowCenter}>
            <Text title={Strings.haveAccount} style={s.notAcTextStyle} />
            <Text title={Strings.signIn} onPress={navToLogin} style={s.textButtonStyle} />
          </View>
        </View>

        <View style={c.h12} />
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
    </AppRoot>
  );
};

export default SignUp;
