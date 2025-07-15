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
  onAdd?: () => void;
  hide?: boolean;
  image?: boolean;
}

const Header: React.FC<HeaderProps> = ({ image, hide, onPress, title, isBack, onAdd }) => {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.headerInnerStyle}>
        {!hide && (
          <TouchableOpacity onPress={onPress} style={styles.iconStyle}>
            <Icon
              name={isBack ? 'arrow-back-outline' : 'menu-outline'}
              size={28}
              color={Colors.white}
            />
          </TouchableOpacity>
        )}

        {image ? (
          <Image resizeMode="contain" style={styles.logoStyle} source={ImageView.logoWhite} />
        ) : (
          <Text style={styles.titleStyle} title={title} />
        )}
      </View>

      {onAdd && (
        <TouchableOpacity onPress={onAdd} style={styles.iconRightStyle}>
          <Icon name={'add-circle-outline'} size={25} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
