import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Colors, ImageView } from '@constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';
import { Routes } from '@/navigation/route';
import { navigate } from '@/navigation/navigationHelper';

interface HeaderProps {
  onPress?: () => void;
  title?: string;
  isBack?: boolean;
  onAdd?: () => void;
  hide?: boolean;
  image?: boolean;
  notification?: boolean
}

const Header: React.FC<HeaderProps> = ({ image, hide, onPress, title, isBack, onAdd, notification }) => {
  
  const navToNotification = () => navigate(Routes.Notification)
  
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

      <View style={{ flexDirection: 'row', gap: '10' }}>
        {onAdd && (
          <TouchableOpacity onPress={onAdd} style={styles.iconRightStyle}>
            <Icon name={'add-circle-outline'} size={25} color={Colors.white} />
          </TouchableOpacity>
        )}

        {!notification && (
          <TouchableOpacity onPress={navToNotification} style={{ top: 2 }}>
            <Icon color={Colors.white} name="notifications-outline" size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
