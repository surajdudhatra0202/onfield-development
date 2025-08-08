import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, DateTimePicker, KeyboardAvoidingView } from '@components';
import c from '@style';
import { Constants, StorageKey, Strings } from '@constants';
import { Post } from '@services';
import { CALLS_SAVE, isEmptyValue, PrefManager, showPopupMessage } from '@utils';
import { Routes } from '../../../navigation/route';
import { NavigationProps } from '@/navigation/navigation';
import { ApiResponse, AuthData, FieldData } from '@/types/global';
import DynamicFormField from '../../Shared/Form/dynamicFormField'
import moment from 'moment';

const CallDetails = ({ navigation, route }: NavigationProps) => {
  const { callInfoProps, formData } = route.params;
  const [fieldsData, setFieldsData] = useState<FieldData[]>(formData);
  const [loadingState, setLoadingState] = useState(1); // 1 false, 2 save work on, 3 next screen
  const [activeDateIndex, setActiveDateIndex] = useState<number>(-1);
  const [activeDateTimeIndex, setActiveDateTimeIndex] = useState<number>(-1);

  const onChange = (
    type: string,
    index: number,
    txt?: string,
    subIndex?: number,
    position?: 'left' | 'right'
  ) => {
    if (type === 'number' || type === 'text' || type === 'textarea') {
      fieldsData[index].value = txt;
      fieldsData[index].error = false;
    } else if (type === 'checkbox') {
      if (fieldsData[index].value.includes(txt)) {
        fieldsData[index].value.splice(fieldsData[index].value.indexOf(txt!), 1);
      } else {
        fieldsData[index].value.push(txt);
      }
    } else if (type === 'radio') {
      fieldsData[index].value = txt;
    } else if (type === 'datetime') {
      fieldsData[index].value = txt;
      fieldsData[index].error = false;
      setActiveDateTimeIndex(-1);
    } else if (type === 'date') {
      fieldsData[index].value = txt;
      fieldsData[index].error = false;
      setActiveDateIndex(-1);
    } else if (type === 'dropdown') {
      fieldsData[index].value = txt;
      fieldsData[index].error = false;
    } else if (type === 'group_text') {
      fieldsData[index].error = false;
      const vl = fieldsData[index]?.value ?? []
      const left = vl[0]?.split('|') ?? [];
      const right = vl[1]?.split('|') ?? [];

      if (position === 'left') {
        left[subIndex] = txt
      } else {
        right[subIndex] = txt
      }
      fieldsData[index].value = [left.join('|'), right.join('|')]
    }
    setFieldsData([...fieldsData]);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FieldData; index: number }) => (
      <DynamicFormField
        item={item}
        index={index}
        onChange={onChange}
        setActiveDateIndex={setActiveDateIndex}
        setActiveDateTimeIndex={setActiveDateTimeIndex}
      />
    ),
    [fieldsData]
  );

  const handleConfirm = (d: string) => {
    if (activeDateTimeIndex !== -1) {
      onChange('datetime', activeDateTimeIndex, d.toString());
    } else {
      onChange('date', activeDateIndex, d.toString());
    }
  };

  const handleCancel = () => {
    setActiveDateTimeIndex(-1);
    setActiveDateIndex(-1);
  };

  const onSubmit = async (from = 1) => {
    try {
      setLoadingState(from);
      let obj: Record<string, unknown> = {};
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);

      for (let i = 0; i < fieldsData.length; i++) {
        const field = fieldsData[i];
        let value = field.value;

        if (field?.type === 'date' && field.value) {
          const formatted = moment(field.value);
          value = formatted.isValid()
            ? formatted.format(Constants.dateFormat['DATE_FORMAT'])
            : field.value;
        } else if (field?.type === 'datetime' && field.value) {
          const formatted = moment(field.value);
          value = formatted.isValid()
            ? formatted.format(Constants.dateFormat['DATE_TIME_FORMAT'])
            : field.value;
        } else if (field?.type === 'group_text') {
          if (
            Array.isArray(field.value) &&
            field.value.length >= 2 &&
            field.value[0] &&
            field.value[1]
          ) {
            value = `${field.value[0]} && ${field.value[1]}`;
          } else {
            value = '';
          }
        }
        if (field.required === 1 && isEmptyValue(field.value)) {
          console.log(field);
          fieldsData[i].error = true;
          setFieldsData([...fieldsData]);
          showPopupMessage(Strings.error, `${field.label} can't be empty`, true);
          return true
        }

        obj[field.name] =
          Array.isArray(field.value) && field.type !== 'group_text'
            ? field.value.join(',')
            : value;
      }

      const request = {
        user_id: authData.id,
        call_id: callInfoProps.id,
        meta: obj,
      };
      const { data, message } = await Post(CALLS_SAVE, request) as ApiResponse;
      if (data?.status) {
        if (from == 2) {
          navigation.navigate(Routes.Home)
          showPopupMessage(data.status ? Strings.success : Strings.error, data.message ?? message, false);
        }
        else if (from === 3) {
          navigation.navigate(Routes.Attachment, { callInfoProps, fieldsData })
        }
      } else {
        showPopupMessage(data.status ? Strings.success : Strings.error, data.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoadingState(0);
    }
  };

  const onSave = () => onSubmit(2);

  const onNext = () => onSubmit(3);

  return (
    <View style={c.flex1W}>
      <KeyboardAvoidingView nestedScrollEnabled style={c.flex1WHorizontal}>
        <FlatList
          style={c.listFormStyle}
          data={fieldsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.name}`}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>

      {!!fieldsData.length && (
        <View style={c.buttonRowStyle}>
          <Button
            loading={loadingState == 2}
            disabled={loadingState == 2}
            text={Strings.saveText}
            onPress={onSave}
            icon={'check'}
            style={c.buttonSaveStyle}
          />

          <Button
            loading={loadingState == 3}
            disabled={loadingState == 3}
            text={'Next'}
            onPress={onNext}
            icon={Strings.nextText}
            style={c.buttonNextStyle}
          />
        </View>
      )}

      {(activeDateIndex !== -1 || activeDateTimeIndex !== -1) && (
        <DateTimePicker
          isVisible
          mode={activeDateIndex !== -1 ? 'date' : 'datetime'}
          minimumDate={new Date()}
          date={
            activeDateIndex !== -1
              ? fieldsData[activeDateIndex]?.value
                ? new Date(fieldsData[activeDateIndex].value)
                : new Date()
              : fieldsData[activeDateTimeIndex]?.value
                ? new Date(fieldsData[activeDateTimeIndex].value)
                : new Date()
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
};

export default CallDetails;
