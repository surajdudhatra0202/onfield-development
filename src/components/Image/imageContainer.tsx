import React from 'react';
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { styles } from './styles';

interface Props {
  key?: string;
  data: string;
  require?: boolean;
  style?: StyleProp<ImageStyle>;
}

const ImageContainer: React.FC<Props> = ({ key, data, require, style }) => {
  return (
    <View key={key}>
      <Image style={[styles.image, style]} source={require ? data : { uri: data }} />
    </View>
  );
};

export default ImageContainer;
