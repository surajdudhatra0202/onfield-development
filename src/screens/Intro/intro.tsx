import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors, Constants, Strings } from '@constants';
import c from '@style';
import { AppRoot, Button } from '@components';
import styles from './styles';
import type { NavigationProps } from '@/navigation/navigation';

const { width: screenWidth } = Dimensions.get('window');

const Intro = ({ navigation }: NavigationProps) => {
  const [index, setIndex] = useState<number>(0);
  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const animateText = () => {
    translateX.setValue(screenWidth);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      animateText();
    }, 50); // small delay to allow text to re-render
    return () => clearTimeout(timeout);
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={c.flex1}>
      <View style={styles.introView}>
        <Image 
          source={{ uri: item.image }} 
          resizeMode="stretch" 
          style={styles.image} />
      </View>

      <Animated.View
        key={`slide-${index}`}
        style={[
          c.marginT6,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.des}</Text>
      </Animated.View>
    </View>
  );

  const keyExtractor = (item: Item) => item.id.toString();

  const navToAuth = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignUp' }],
    });

  return (
    <AppRoot>
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        onSlideChange={(i) => setIndex(i)}
      />

      {index === 3 ? (
        <Button
          text={Strings.letgetstart}
          bottom={8}
          onPress={navToAuth}
          style={c.buttonStyle} />
      ) : (
        <View style={c.buttonRowStyle}>
          <Button
            text={Strings.skipText}
            onPress={navToAuth}
            style={c.buttonSaveStyle} />

          <Button
            textColor={Colors.white}
            style={c.buttonNextStyle}
            text={Strings.continue}
            onPress={navToAuth}
            icon={'arrow-right-thick'}
          />
        </View>
      )}
    </AppRoot>
  );
};


export default Intro;

const data = [
  {
    id: 1,
    title: 'Track Your Progress, and Achieve Your Dreams!',
    des: 'Stay focused on your goals and watch your dreams come true. Taskify empowers you to track progress every step of the way.',
    image: `${Constants.IMAGE_URL}intro1.png`,
  },
  {
    id: 2,
    title: 'Track Your Progress, and Achieve Your Dreams!',
    des: 'Stay focused on your goals and watch your dreams come true. Taskify empowers you to track progress every step of the way.',
    image: `${Constants.IMAGE_URL}intro2.png`,
  },
  {
    id: 3,
    title: 'Track Your Progress, and Achieve Your Dreams!',
    des: 'Stay focused on your goals and watch your dreams come true. Taskify empowers you to track progress every step of the way.',
    image: `${Constants.IMAGE_URL}intro3.png`,
  },
  {
    id: 4,
    title: 'Track Your Progress, and Achieve Your Dreams!',
    des: 'Stay focused on your goals and watch your dreams come true. Taskify empowers you to track progress every step of the way.',
    image: `${Constants.IMAGE_URL}intro4.png`,
  },
];

type Item = (typeof data)[0];
