import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import c from '@style';
import { Colors, StorageKey, Strings } from '@constants';
import styles from './styles';
import moment from 'moment';
import { showPopupMessage, LEAVES_ADD, PrefManager } from '@utils';
import { Button, DateTimePicker, FormHeader, Input, KeyboardAvoidingView, Text } from '@components';
import { Post } from '@services';
import type { NavigationProps } from '@/navigation/navigation';
import { ApiResponse, AuthData } from '@/types/global';

const RequestLeave = ({ navigation }: NavigationProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>();
  const [reason, setReason] = useState<string>('');

  const [dateVisible1, setDateVisible1] = useState<boolean>(false);
  const [dateVisible2, setDateVisible2] = useState<boolean>(false);

  const toSumit = async () => {
    try {
      if (fromDate?.length === 0) {
        showPopupMessage(Strings.error, Strings.plsSfromDate, true);
      } else if (toDate?.length === 0) {
        showPopupMessage(Strings.error, Strings.plsStoDate, true);
      } else if (reason.length === 0) {
        showPopupMessage(Strings.error, Strings.plsELeaveReason, true);
      } else {
        setLoading(true);
        
        const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
        const request = {
          from: moment(fromDate).format('YYYY-MM-DD'),
          to: moment(toDate).format('YYYY-MM-DD'),
          reason: reason,
          user_id: authData.id,
        };
        const { data, message } = await Post(LEAVES_ADD, request) as ApiResponse;

        if (data.status) {
          showPopupMessage(Strings.success, data?.message, false);
          navigation.goBack();
        } else {
          showPopupMessage(Strings.error, data?.message ?? message, true);
        }
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (d: string) => {
    if (dateVisible1) {
      setFromDate(d);
      setDateVisible1(false);
    } else if (d > fromDate) {
      setToDate(d);
      setDateVisible2(false);
    } else {
      setDateVisible2(false);
      showPopupMessage(Strings.error, Strings.leaveDateErrMsg, true);
    }
  };

  const handleCancel = () => {
    if (dateVisible1) {
      setDateVisible1(false);
    } else {
      setDateVisible2(false);
    }
  };

  const showDatePicker1 = () => {
    setDateVisible1(true);
  };

  const showDatePicker2 = () => {
    setDateVisible2(true);
  };

  function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const getDistance = () => {
    if (!fromDate || !toDate) {
      return 0;
    }
    const a = new Date(fromDate),
      b = new Date(toDate),
      difference = dateDiffInDays(a, b);
    return difference + 1;
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={c.flex1P}>
      <FormHeader isBack onPress={goBack} title={Strings.requestLeave} />
      <KeyboardAvoidingView nestedScrollEnabled style={c.formHeaderViewStyle}>
        <TouchableOpacity onPress={showDatePicker1}>
          <Input
            title={Strings.fromTitle}
            placeholder={Strings.selectDatePlaceholderText}
            value={fromDate && moment(fromDate).format('DD MMM, YYYY')}
            editable={false}
            icon2={'calendar-month-outline'}
            inputStyle={c.inputStyle}
            rightIconStyle={c.rightIconStyleRight0}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker2}>
          <Input
            title={Strings.titleTo}
            placeholder={Strings.dateTxt}
            value={toDate && moment(toDate).format('DD MMM, YYYY')}
            editable={false}
            icon2={'calendar-month-outline'}
            inputStyle={c.inputStyle}
            rightIconStyle={c.rightIconStyleRight0}
          />
        </TouchableOpacity>
        <View style={c.flex1}>
          <View style={styles.numberDaySec}>
            <Text title={Strings.totalNoOfDayTxt} style={c.textRegularGray14} />
            <View style={styles.daysView}>
              <Text
                title={`${getDistance()} ${Strings.days}`}
                style={styles.textMediumPrimaryLeave}
              />
            </View>
          </View>
          <Input
            title={Strings.reasornForLeaveText}
            placeholder={Strings.reasonPlaceholder}
            value={reason}
            onChangeText={setReason}
            multiline={true}
            inputStyle={c.inputStyle}
            inputHeight={100}
          />

          <Button
            top={6}
            loading={loading}
            onPress={toSumit}
            textColor={Colors.white}
            icon={'arrow-right'}
            style={c.buttonStyle}
            text={Strings.submitText}
          />
        </View>
      </KeyboardAvoidingView>
      {(dateVisible1 || dateVisible2) && (
        <DateTimePicker
          isVisible={dateVisible1 || dateVisible2}
          mode="date"
          minimumDate={fromDate ? new Date(fromDate) : new Date()}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
};

export default RequestLeave;
