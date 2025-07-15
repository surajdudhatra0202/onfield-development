import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { styles } from './styles';

interface SeparatorProps {
  style?: StyleProp<ViewStyle>;
  padding?: number;
  borderHeight?: number;
}

const Separator: React.FC<SeparatorProps> = ({ style, padding = 0, borderHeight = 1 }) => {
  return <View style={[styles.line, style, { padding, borderBottomWidth: borderHeight }]} />;
};

export default Separator;
