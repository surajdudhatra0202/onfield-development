import { ModalView, Text } from '@/components';
import View from '@/components/View';
import c from '@/style';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Colors, Strings } from '@/constants';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CallHistoryProps {
  visible: boolean;
  onClose: () => void;
  src?: string;
  params?: any;
}

const CallHistory: React.FC<CallHistoryProps> = ({ visible, onClose }) => {
  return (
    <ModalView visible={visible} onClose={onClose}>
      <SafeAreaView style={c.flex1}>
        <View style={styles.callContainer}>
          <View backgroundColor={Colors.grey} padding={18} borderRadius={16}>
            <View style={styles.topActions}>
              <Text title={Strings.callHistory} style={styles.headerText} />

              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <MaterialIcons name="close" size={25} color={Colors.red} />
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.tableHead}>
                <Text title={'Date'} style={styles.headText} />
                <Text title={'No. of Call'} style={styles.headText} />
              </View>

              {mockDate.map((item, index) => (
                <View key={index} style={styles.dateTable}>
                  <Text title={item.date} />
                  <Text title={`${item.noOfCalls} Calls`} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ModalView>
  );
};

export default CallHistory;

const mockDate = [
  {
    date: '07/08/2025',
    noOfCalls: '0',
  },
  {
    date: '12/08/2025',
    noOfCalls: '10',
  },
  {
    date: '05/08/2025',
    noOfCalls: '5',
  },
  {
    date: '20/08/2025',
    noOfCalls: '7',
  },
];
