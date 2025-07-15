import React, { ReactNode } from 'react';
import { TouchableOpacity, TextStyle, DimensionValue, ViewStyle } from 'react-native';
import { Colors } from '@constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import View from '../View';
import { s } from './styles';
import { DotIndicator } from 'react-native-indicators';

interface ButtonProps {
  text?: string;  // Button text (optional)
  disabled?: boolean;  // Disabled state (optional)
  loading?: boolean;  // Loading state (optional)
  onPress?: () => void;  // Function to call on button press (optional)
  style?: TextStyle | ViewStyle;  // Style can be ViewStyle or TextStyle or an array of both
  top?: DimensionValue | number;  // Top margin (optional)
  bottom?: DimensionValue | number;  // Bottom margin (optional)
  bgColor?: string;  // Background color (optional)
  textColor?: string;  // Text color (optional)
  transparent?: boolean;  // If the button should be transparent (optional)
  icon?: ReactNode;  // Icon for the button, could be a string (icon name) or a ReactNode (optional)
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  style,
  disabled,
  loading,
  top,
  bottom,
  bgColor,
  textColor,
  transparent,
  icon,
}) => {
  const color = disabled && !loading
  ? Colors.medium_light_gray
  : bgColor
  ?? (transparent ? Colors.transparent : style?.backgroundColor);
  
  const computedStyle = {
    backgroundColor: color,
    marginBottom: bottom ?? style?.marginBottom,
    marginTop: top ?? style?.marginTop,
  }
  
  return (
    <TouchableOpacity
      style={[style, computedStyle]}
      activeOpacity={loading ? 1 : 0.6}
      disabled={disabled || loading}
      onPress={onPress} >
      {loading ? (
        <DotIndicator color={Colors.white} size={7} style={{}} />
      ) : (
        <Text
          color={textColor ?? Colors.white}
          style={icon ? s.iconTextStyle : s.textStyle}
          title={text}
        />
      )}

      {!loading && typeof icon === 'string' && (
        <View style={s.iconViewStyle}>
          <Icon name={icon} size={22} color={Colors.white} />
        </View>
      )}

      {!loading && typeof icon !== 'string' && icon}
    </TouchableOpacity>
  );
};
export default Button;