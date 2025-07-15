import c from '@style';
import React from 'react';
import { Modal, View } from 'react-native';
import KeyboardAvoidingView from '../Keyboard/keyboardAvoidingView';
import { styles } from './styles';

interface ModalViewProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalView: React.FC<ModalViewProps> = ({ visible, children, onClose }) => {
  return (
    <Modal transparent={true} animationType={'fade'} visible={visible} onRequestClose={onClose}>
      <View style={c.flex1}>
        <View style={styles.modalBackground}>
          <View style={styles.ViewWrapper}>
            <KeyboardAvoidingView style={c.flex1}>{children}</KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;
