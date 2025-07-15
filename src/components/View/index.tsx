import React from 'react';
import type { DimensionValue, ViewStyle } from 'react-native';
import { View } from 'react-native';

interface ViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  flex?: number;
  width?: DimensionValue;
}

const CustomView: React.FC<ViewProps> = ({
  children,
  style = {},
  padding,
  margin,
  backgroundColor,
  borderRadius,
  flex,
  width,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        style,
        {
          padding: padding ?? style?.padding,
          margin: margin ?? style?.margin,
          backgroundColor: backgroundColor ?? style?.backgroundColor,
          borderRadius: borderRadius ?? style?.borderRadius,
          flex: flex ?? style?.flex,
          width: width ?? style?.width,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default React.memo(CustomView);
