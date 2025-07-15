import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Colors, ImageView } from '@constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';

interface HeaderProps {
  onPress?: () => void;
  title?: string;
  isBack?: boolean;
  hide?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hide, onPress, title, isBack }) => {
  return (
    <View style={styles.formHeaderStyle}>
      {!hide && (
        <TouchableOpacity onPress={onPress} style={styles.formIconStyle}>
          <Icon name={isBack ? 'chevron-back' : 'menu-outline'} size={28} color={Colors.white} />
        </TouchableOpacity>
      )}

      <Text left={-22} style={styles.titleStyle} title={title} />
      <View />

      <Image resizeMode="contain" source={ImageView.innerFrame} style={styles.imageStyle} />
    </View>
  );
};

export default Header;
