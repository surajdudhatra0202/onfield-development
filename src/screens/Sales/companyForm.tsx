import { Button, FormHeader, KeyboardAvoidingView } from '@/components';
import { Strings } from '@/constants';
import { NavigationProps } from '@/navigation/navigation';
import c from '@/style';
import { FieldData } from '@/types/global';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DynamicFormField from '../Shared/Form/dynamicFormField';
import { showPopupMessage } from '@/utils';

const CompanyForm = ({ navigation }: NavigationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<FieldData[]>(companyFormFields);

  const onChange = (type: string, index: number, value?: string) => {
    const updated = [...formFields];
    updated[index].value = value ?? '';
    setFormFields(updated);
  };

  const validateForm = () => {
    let valid = true;
    const updated = [...formFields];

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].required && !updated[i].value?.trim()) {
        updated[i].error = true;
        valid = false;
      } else {
        updated[i].error = false;
      }
    }

    setFormFields(updated);
    return valid;
  };

  const onNext = async () => {
    try {
      setLoading(true);

      const newCompany = {
        name: formFields.find((f) => f.name === 'name')?.value,
        email: formFields.find((f) => f.name === 'email')?.value,
        contact_person: formFields.find((f) => f.name === 'contact_person')?.value,
        address: formFields.find((f) => f.name === 'address')?.value,
        phone: formFields.find((f) => f.name === 'phone')?.value,
        mobile: formFields.find((f) => f.name === 'mobile')?.value,
      };

      console.log('new company', newCompany);

      const clearData = formFields.map((field) => ({
        ...field,
        value: '',
        error: false,
      }));

      setFormFields(clearData);

      showPopupMessage(Strings.success, 'From api', false);
      
      goBack();
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }

    if (!validateForm()) {
      showPopupMessage(Strings.error, Strings.emptyFieldErr, true);
      return;
    }
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FieldData; index: number }) => (
      <DynamicFormField item={item} index={index} onChange={onChange} />
    ),
    [formFields],
  );

  const goBack = () => navigation.goBack();

  return (
    <View style={c.flex1P}>
      <FormHeader isBack onPress={goBack} title={Strings.addCompany} />

      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled
        style={c.formHeaderViewStyle}
      >
        <FlatList
          style={c.listFormStyle}
          data={formFields}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
        <View style={c.h26} />
      </KeyboardAvoidingView>

      <View style={c.colorWhite}>
        <Button
          text={Strings.saveText}
          bottom={8}
          loading={loading}
          onPress={onNext}
          icon={'arrow-right-thick'}
          style={c.buttonStyle}
        />
      </View>
    </View>
  );
};

export default CompanyForm;

const companyFormFields: FieldData[] = [
  {
    required: 1,
    name: 'name',
    label: 'Company name',
    type: 'text',
    value: '',
  },
  {
    required: 1,
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
  },
  {
    required: 1,
    name: 'contact_person',
    label: 'Contact Person',
    type: 'text',
    value: '',
  },
  {
    required: 1,
    name: 'mobile',
    label: 'Mobile',
    type: 'number',
    value: '',
  },
  {
    required: 0,
    name: 'phone',
    label: 'Phone',
    type: 'number',
    value: '',
  },
  {
    required: 1,
    name: 'address',
    label: 'Address',
    type: 'textarea',
    value: '',
  },
];
