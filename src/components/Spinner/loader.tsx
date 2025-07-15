import { Colors, Strings } from '@constants';
import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { s } from './styles';

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ visible, text }) => {
  if (!visible) {
    return null;
  } // Avoid unnecessary rendering

  return (
    <Modal transparent={true} animationType={'none'} visible={visible}>
      <View style={s.modalBackground}>
        <ActivityIndicator color={Colors.primary} size={'large'} />
        <Text style={s.textB}>{text ?? Strings.plsWait}</Text>
      </View>
    </Modal>
  );
};

export default Loader;
