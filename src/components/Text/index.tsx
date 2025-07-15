import React from 'react';
import {
  Text as RNText,
  TextStyle,
  DimensionValue,
  TextProps as RNTextProps,
} from 'react-native';

interface TextProps extends RNTextProps {
  title?: React.ReactNode;
  onPress?: () => void;
  style?: TextStyle;
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  paddingH?: number;
  color?: string;
  lineHeight?: number;
  size?: number;
  fontFamily?: string;
  numberOfLines?: number;
  width?: DimensionValue;
}

const Text: React.FC<TextProps> = ({
  title,
  onPress,
  style,
  bottom,
  top,
  left,
  right,
  textAlign,
  paddingH,
  color,
  size,
  fontFamily,
  numberOfLines,
  width,
  ...props
}) => {
  const computedStyle: TextStyle = {
    width: width ?? style?.width,
    marginLeft: left ?? style?.marginLeft,
    marginRight: right ?? style?.marginRight,
    textAlign: textAlign ?? style?.textAlign,
    paddingHorizontal: paddingH ?? style?.paddingHorizontal,
    marginBottom: bottom ?? style?.marginBottom,
    marginTop: top ?? style?.marginTop,
    color: color ?? style?.color,
    fontSize: size ?? style?.fontSize,
    fontFamily: fontFamily ?? style?.fontFamily,
  };

  return (
    <RNText
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[style, computedStyle]} >
      {title}
    </RNText>
  );
};

export default React.memo(Text);