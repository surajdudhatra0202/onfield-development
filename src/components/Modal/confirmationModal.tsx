import React from 'react';
import { Modal, View } from 'react-native';
import Text from '../Text';
import c from '@/style';
import { styles } from './styles';
import Button from '../Button/button';
import { Colors } from '@/constants';

interface ModalViewProps {
  visible: boolean;
  onYes: () => void;
  onNo: () => void;
  message?: string;
  loading?: boolean;
}

const ConfirmationModal: React.FC<ModalViewProps> = ({ visible, onYes, onNo, message, loading }) => {
  return (
    <Modal transparent={true} animationType={'fade'} visible={visible}>
      <View style={c.flex1}>
        <View style={styles.confirmModalBackground}>
          <View style={styles.content}>
            <Text style={styles.text} title={message} />

            <View style={styles.buttons}>
              <Button text="No" style={styles.noBtn} textColor={Colors.primary} onPress={onNo} />
              <Button text="Yes" style={styles.yesBtn} onPress={onYes} loading={loading} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
