import { Strings } from '@constants';
import React from 'react';
import { Text, View } from 'react-native';
import { s } from './styles';

interface EmptyComponentProps {
  title?: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ title = Strings.noDataAvailableMsg }) => {
  return (
    <View style={s.box}>
      <Text style={s.txt}>{title}</Text>
    </View>
  );
};

export default EmptyComponent;
