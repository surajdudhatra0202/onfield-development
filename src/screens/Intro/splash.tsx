import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import c from '@style';
import { ImageView, StorageKey } from '@constants';
import styles from './styles';
import { PrefManager } from '@utils';
import { Routes } from '../../navigation/route';
import type { NavigationProps } from '@/navigation/navigation';
import { AuthData } from '@/types/global';

const Splash = ({ navigation }: NavigationProps) => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const shape1Anim = useRef(new Animated.Value(-100)).current;
  const shape2Anim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // Parallel animation
    Animated.parallel([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
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

    const timer = setTimeout(async () => {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
      if (authData.id) {
        const routeName = authData.type_id === 4 ? Routes.Order : authData.day_started === 1 ?Routes.Home :Routes.DayStatus ; //Home
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
        navigation.navigate(Routes.Intro);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, logoAnim, shape1Anim, shape2Anim]);

  return (
    <View style={c.rootCenter}>
      <Animated.Image
        source={ImageView.logoDark}
        resizeMode="contain"
        style={[
          styles.imgStyle,
          {
            opacity: logoAnim,
            transform: [{ scale: logoAnim }],
          },
        ]}
      />

      <Animated.Image
        source={ImageView.shape1}
        resizeMode="contain"
        style={[
          styles.shap1Style,
          {
            transform: [{ translateY: shape1Anim }],
          },
        ]}
      />

      <Animated.Image
        source={ImageView.shape2}
        resizeMode="contain"
        style={[
          styles.shap2Style,
          {
            transform: [{ translateY: shape2Anim }],
          },
        ]}
      />
    </View>
  );
};

export default Splash;
