import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components';
import { Colors, Strings } from '@/constants';
import c from '@/style';

interface InfoRowProps {
  title: string;
  value: string | number | undefined;
}

const InfoRow: React.FC<InfoRowProps> = ({ title, value = '-' }) => {
  
  return (
    <View style={c.flexRowStart}>
      <Text
        width={'30%'}
        color={Colors.labelColor}
        title={title}
        style={c.textRegular14}
      />
      <Text title={':'} right={6} style={c.textSemiBold14} />
        <Text
          title={String(value)}
          size={value == Strings.na? 10 :  14}
          top={value == Strings.na? 4 : 0}
          color={value == Strings.na? Colors.darkGrey : Colors.drawerColor}
          style={c.valueText}
          numberOfLines={2}
        />
    </View>
  );
};

export default InfoRow;