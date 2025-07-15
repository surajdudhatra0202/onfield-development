
import { View, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, FormHeader, Button, DateTimePicker, Loader } from '@components';
import { Constants, StorageKey, Strings } from '@constants';
import c from '@style';
import type { NavigationProps } from '@/navigation/navigation';
import { AuthData, FieldData } from '@/types/global';
import { ADD_CALL, CALLFORM, CUSTOMERS_DETAIL, isEmptyValue, PrefManager, showPopupMessage } from '@/utils';
import { Post } from '@/services';
import DynamicFormField from '../Shared/Form/dynamicFormField';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { Routes } from '@/navigation/route';

const AddNewCall = ({ navigation }: NavigationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [introLoad, setIntroLoad] = useState<boolean>(true);
  const [callFormData, setCallFormData] = useState<FieldData[]>([]);
  const [activeDateIndex, setActiveDateIndex] = useState<number>(-1);

  useFocusEffect(
    useCallback(() => {
      getCallDetails('useEffect');
    }, [])
  );

  const onSetFormInfo = (info) => {
    for (let i = 0; i < callFormData.length; i++) {
      if (info[callFormData[i].name]) {
        callFormData[i] = { ...callFormData[i], value: info[callFormData[i].name] }
      }
    }
    setCallFormData([...callFormData])
  }

  const getCallDetails = async (from: string, id?: number) => {
    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        ...(from !== 'useEffect' && { customer_id: id })
      };
      const { data, message } = await Post(from === "useEffect" ? CALLFORM : CUSTOMERS_DETAIL, request);

      if (data.status) {
        if (from === 'useEffect') {
          setCallFormData(data?.data?.fields);
        } else {
          onSetFormInfo(data?.data)
        }

      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setIntroLoad(false)
    }
  };

  const onNext = async () => {
    try {
      setLoading(true);
      let obj: Record<string, unknown> = {};
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);

      for (let i = 0; i < callFormData.length; i++) {
        const field = callFormData[i];
        let value = field.value;

        if (field?.type === 'date' && field.value) {
          const formatted = moment(field.value);
          value = formatted.isValid()
            ? formatted.format(Constants.dateFormat['DATE_FORMAT'])
            : field.value;
        }

        if (field.required === 1 && isEmptyValue(field.value)) {
          console.log(field);
          callFormData[i].error = true;
          setCallFormData([...callFormData]);
          showPopupMessage(Strings.error, `${field.label} can't be empty`, true);
          return true
        }

        obj[field.name] =
          Array.isArray(field.value)
            ? field.value.join(',')
            : value;
      }

      const request = {
        user_id: authData.id,
        ...obj
      };
      const { data, message } = await Post(ADD_CALL, request);

      if (!data.status) {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      } else {
        navigation.navigate(Routes.Home)
        showPopupMessage(Strings.success, data?.message ?? message, false);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  }

  const onChange = (
    type: string,
    index: number,
    txt?: string,
    idx?: number
  ) => {
    if (type === 'dropdown') {
      callFormData[index].value = txt;
      callFormData[index].error = false;
      getCallDetails('dropdown', idx);
    } else if (type === 'date') {
      callFormData[index].value = txt;
      callFormData[index].error = false;
      setActiveDateIndex(-1);
    } else {
      callFormData[index].value = txt;
      callFormData[index].error = false;
    }
    setCallFormData([...callFormData]);
  };

  const handleConfirm = (d: string) => {
    onChange('date', activeDateIndex, d.toString());
  };

  const handleCancel = () => {
    setActiveDateIndex(-1);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FieldData; index: number }) => (
      <DynamicFormField
        item={item}
        index={index}
        onChange={onChange}
        setActiveDateIndex={setActiveDateIndex}
      />
    ),
    [callFormData]
  );

  const openDrawer = () => navigation.openDrawer();

  return (
    <View style={c.flex1P}>
      <FormHeader onPress={openDrawer} title={Strings.addNewCall} />
      <KeyboardAvoidingView keyboardShouldPersistTaps={'always'} nestedScrollEnabled style={c.formHeaderViewStyle}>
        <FlatList
          style={c.listFormStyle}
          data={callFormData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
        <View style={c.h26} />
      </KeyboardAvoidingView>


      <View style={c.colorWhite}>
        {callFormData.length !== 0 && (
          <Button
            text={Strings.saveText}
            bottom={8}
            loading={loading}
            onPress={onNext}
            icon={'arrow-right-thick'}
            style={c.buttonStyle}
          />
        )}
      </View>
      {(activeDateIndex !== -1) && (
        <DateTimePicker
          isVisible
          mode={activeDateIndex !== -1 ? 'date' : 'datetime'}
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <Loader visible={introLoad} />
    </View>
  );
};

export default AddNewCall;
