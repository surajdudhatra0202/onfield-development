import { Button, DateTimePicker, Header, Input, ListItem } from '@/components';
import View from '@/components/View';
import c from '@/style';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors, Strings } from '@/constants';
import { NavigationProps } from '@/navigation/navigation';
import moment from 'moment';
import TabListScreen from '../Shared/List/tabList';
import { CALLS, showPopupMessage } from '@/utils';
import styles from './styles';

const CallTransfer: React.FC<Props> = ({ navigation, route }: NavigationProps) => {
  const [dateVisible, setDateVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState(false);

  const { callData } = route?.params;

  const item = callData?.data?.calls;

  const handleConfirm = (d: string) => {
    setSelectedDate(moment(d).format('YYYY-MM-DD'));
    setDateVisible(false);
    setDateError(false);
  };

  const handleCancel = () => {
    setDateVisible(false);
  };

  const showDatePicker = () => {
    setDateVisible(true);
  };

  const toSubmit = async () => {
    try {
      if (!selectedDate) {
        setDateError(true);
        showPopupMessage(Strings.error, 'Please ' + Strings.selectDatePlaceholderText, true);
      } else {
        showPopupMessage(Strings.success, Strings.callTransferDate + selectedDate, false, Colors.green);
        console.log('call transfer submited');
      }
    } catch {
      showPopupMessage(Strings.error, 'Some thing went wrong, try again leter !', true);
    }
  };

  const goBack = () => navigation.goBack();

  const renderItem = ({ item }) => (
    <ListItem
      status={item.priority}
      srNo={item.call_no}
      label={'Company'}
      value={item.customer}
      date={item.l_date}
    />
  );

  return (
    <View style={c.flex1}>
      <Header isBack onPress={goBack} title="Call Transfer" />

      <View style={c.flex1WHorizontal}>
        <TabListScreen
          renderItem={renderItem}
          tabScreens={[
            {
              name: Strings.pendingCalls,
              type: 1,
              apiEndPoint: CALLS,
              dataLabel: 'calls',
            },
          ]}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.bottomAction} onPress={showDatePicker}>
            <Input
              title={Strings.callTransfer}
              placeholder={Strings.selectDatePlaceholderText}
              editable={false}
              icon2={'calendar-month-outline'}
              inputStyle={[c.inputStyle, dateError && { borderColor: Colors.red, borderWidth: 1 }]}
              rightIconStyle={c.rightIconStyleRight0}
              value={selectedDate}
              borderColor={(dateError ? Colors.red : Colors.grey)}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction} onPress={showDatePicker}>
            <Button
              top={6}
              loading={loading}
              onPress={toSubmit}
              textColor={Colors.white}
              icon={'arrow-right'}
              style={c.buttonStyle}
              text={Strings.submitText}
            />
          </TouchableOpacity>
        </View>

        {dateVisible && (
          <DateTimePicker
            isVisible
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </View>
    </View>
  );
};

export default CallTransfer;
