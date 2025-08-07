import { Button, FormHeader, KeyboardAvoidingView, Loader, Text } from '@/components';
import { NavigationProps } from '@/navigation/navigation';
import c from '@/style';
import { AuthData, FieldData } from '@/types/global';
import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import DynamicFormField from '../Shared/Form/dynamicFormField';
import { DateTimePicker } from '@/components';
import { Colors, StorageKey, Strings } from '@/constants';
import { CALLFORM, CUSTOMERS_DETAIL, PrefManager, showPopupMessage } from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { Routes } from '@/navigation/route';
import { Post } from '@/services';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import salesForm from './salesForm';
import CallHistory from './callHistory';

const Sales = ({ navigation }: NavigationProps) => {
  const [introLoad, setIntroLoad] = useState<boolean>(false);
  const [callFormData, setCallFormData] = useState<FieldData[]>([]);
  const [activeDateIndex, setActiveDateIndex] = useState<number>(-1);
  const [selectedDetails, setSelectedDetails] = useState<string>('');
  const [customerDtl, setCustomerDtl] = useState<FieldData[]>([]);
  const [customerName, setCustomerName] = useState();
  const [viewCallHistory, setViewCallHistory] = useState<boolean>(false);

  const navTonext = () => navigation.navigate(Routes.AddCompany);

  const callHistory = () => {
    setViewCallHistory(true);
  };

  useFocusEffect(
    useCallback(() => {
      setCallFormData([]);
      setSelectedDetails('');
      setCustomerDtl([]);
      setCustomerName(undefined);
      setActiveDateIndex(-1);

      getCompanyDetails('useEffect');
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getCompanyDetails('useEffect');
    }, []),
  );

  const onSetFormInfo = (data: any) => {
    setCustomerDtl(data);
  };

  const getCompanyDetails = async (from: string, id?: number) => {
    setIntroLoad(true);
    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);

      const request = {
        user_id: authData.id,
        ...(from !== 'useEffect' && { customer_id: id }),
      };

      const { data, message } = await Post(
        from === 'useEffect' ? CALLFORM : CUSTOMERS_DETAIL,
        request,
      );

      if (data.status) {
        if (from === 'useEffect') {
          const apiFields = data?.data?.fields;

          const findCustomer = apiFields.find(
            (field: { name: string }) => field.name === 'customer',
          );

          setCustomerName(findCustomer);
          // setCallFormData(salesForm);
          setCallFormData(salesForm.map((field) => ({ ...field, value: '', error: false })));
        } else {
          onSetFormInfo(data?.data);
        }
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setIntroLoad(false);
    }
  };

  const onChange = (type: string, index: number, txt?: string, idx?: number) => {
    const updatedFormData = [...callFormData];

    if (type === 'dropdown') {
      callFormData[index].value = txt;
      callFormData[index].error = false;

      if (callFormData[index].name === 'purpose_of_visit') {
        setSelectedDetails(txt);
      }

      setCallFormData(updatedFormData);

      if (updatedFormData[index].name === 'customer') {
        getCompanyDetails('dropdown', idx);
      }
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

  const handleConfirm = (date: Date) => {
    onChange('date', activeDateIndex, date.toString());
  };

  const handleCancel = () => {
    setActiveDateIndex(-1);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FieldData; index: number }) => {
      if (item.name === 'call_details' && selectedDetails !== 'Others') {
        return null;
      }
      return (
        <DynamicFormField
          item={item}
          index={index}
          onChange={onChange}
          setActiveDateIndex={setActiveDateIndex}
          callHistory={callHistory}
        />
      );
    },
    [callFormData, selectedDetails],
  );

  const openDrawer = () => navigation.openDrawer();

  const onNext = () => {
    console.log('Form Data:', customerName, callFormData);
  };

  return (
    <View style={c.flex1P}>
      <FormHeader onPress={openDrawer} title={Strings.sales} />

      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled
        style={c.formHeaderViewStyle}
      >
        <View>
          <View style={c.flexRow}>
            {customerName && (
              <Dropdown
                data={customerName.options.map((opt: any) => ({
                  label: opt.name,
                  value: opt.id,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Select Customer"
                value={customerName.value}
                onChange={(item) => {
                  setCustomerName({ ...customerName, value: item.value });
                  getCompanyDetails('dropdown', item.value); // fetch customer details using selected ID
                }}
                style={styles.dropDownStyle}
              />
            )}

            <TouchableOpacity style={{ marginLeft: 5 }} onPress={navTonext}>
              <Ionicons name="add-circle-outline" size={28} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {customerName?.value && (
            <View style={{ paddingVertical: 8, paddingHorizontal: 2 }}>
              {[
                { label: 'Email :', value: customerDtl.email },
                { label: 'Mobile :', value: customerDtl.phone },
                { label: 'Address :', value: customerDtl.address },
                { label: 'Contact Person :', value: customerDtl.contact_person },
                { label: 'Contact Mobile :', value: customerDtl.mobile },
              ].map((item, index) => (
                <View key={index} style={styles.viewContainer}>
                  <Text style={styles.textTitle} title={item.label} />
                  <Text style={styles.textField} title={item.value} />
                </View>
              ))}
            </View>
          )}
        </View>

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
            // loading={loading}
            onPress={onNext}
            icon={'arrow-right-thick'}
            style={c.buttonStyle}
          />
        )}
      </View>

      {activeDateIndex !== -1 && (
        <DateTimePicker
          isVisible
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {viewCallHistory && (
        <CallHistory visible={viewCallHistory} onClose={() => setViewCallHistory(false)} />
      )}
      <Loader visible={introLoad} />
    </View>
  );
};

export default Sales;
