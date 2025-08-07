import React from 'react';
import { View, ScrollView, TouchableOpacity, TextStyle } from 'react-native';
import { Text, Input } from '@components'; // adjust based on your imports
import moment from 'moment';
import { Colors, Constants, Strings } from '@constants';
import { Dropdown } from 'react-native-element-dropdown';
import { FieldData } from '@/types/global';
import styles from '../../Home/styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import c from '@/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  item: FieldData;
  index: number;
  onChange: (type: FieldData['type'], index: number, value: string, idx?: number, side?: 'left' | 'right') => void;
  setActiveDateIndex?: (index: number) => void;
  setActiveDateTimeIndex?: (index: number) => void;
  callHistory?: () => void;
};

const DynamicFormField = ({
  item,
  index,
  onChange,
  setActiveDateIndex,
  setActiveDateTimeIndex,
  callHistory,
}: Props) => {
  switch (item.type) {
    case 'number':
    case 'text':
    case 'textarea':
    case 'phone':
    case 'email':
      return (
        <Input
          value={item.value}
          title={item.label}
          onChangeText={(text) => onChange(item.type, index, text)}
          inputStyle={c.inputStyle}
          showError={item?.error}
          placeholder={`Enter ${item.label}`}
          multiline={item.type === 'textarea'}
          inputHeight={item.type === 'textarea' ? 120 : 50}
          keyboardType={(item.type === 'number' || item.type === "phone") ? 'number-pad' : 'default'}
        />
      );

    case 'checkbox':
      return (
        <View style={c.marginV12}>
          <Text style={c.textTitleStyle} title={item.label} />
          <View style={c.flexRowWrap}>
            {item.options?.map((e) => (
              <View style={styles.width50} key={e}>
                <BouncyCheckbox
                  size={25}
                  fillColor={Colors.primary}
                  useBuiltInState={false}
                  disableText
                  // onPress={(isChecked: boolean) => setIsChecked(!isChecked)}
                  isChecked={item.value.includes(e)}
                  onPress={() => onChange(item.type, index, e)}
                />
                <Text style={styles.checkBoxTextStyle} title={e} />
              </View>
            ))}
          </View>
        </View>
      );

    case 'radio':
      return (
        <View style={c.marginV12}>
          <Text style={c.textTitleStyle} title={item.label} />
          <ScrollView horizontal>
            {item.options?.map((e) => (
              <View style={parentView()} key={e}>
                <TouchableOpacity
                  onPress={() => onChange(item.type, index, e)}
                  style={touchableView(item.value === e)}>
                  {item.value === e && <View style={styles.innerRadioButton} />}
                </TouchableOpacity>
                <Text style={styles.checkBoxTextStyle} title={e} />
              </View>
            ))}
          </ScrollView>
        </View>
      );

    case 'datetime':
    case 'date':
      let formattedTitle = '';
      if (item.value) {
        const format =
          item.type === 'datetime'
            ? Constants.dateFormat.DATE_TIME_FORMAT
            : Constants.dateFormat.DATE_FORMAT;
        const formatted = moment(item.value);
        formattedTitle = formatted.isValid() ? formatted.format(format) : item.value;
      }

      return (
        <View style={c.marginV12}>
          <Text style={c.textTitleStyle} title={item.label} />
          <View style={c.flexRow}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={datePickerStyle(item?.error ?? false)}
                onPress={() => {
                  if (item.type === 'datetime') {
                    setActiveDateTimeIndex(index);
                  } else {
                    setActiveDateIndex(index);
                  }
                }}
              >
                <Text style={c.textRegular} title={formattedTitle} />
              </TouchableOpacity>
            </View>

            {item.name === 'call_date' && (
              <TouchableOpacity style={{ marginLeft: 5 }} onPress={callHistory}>
                <MaterialIcons name="history" size={28} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );

    case 'dropdown':
      return (
        <View style={c.marginV12}>
          <Text style={c.textTitleStyle} title={item.label} />
          <Dropdown
            style={dropDownStyle(item.error)}
            placeholderStyle={c.placeholderStyle}
            selectedTextStyle={c.selectedTextStyle}
            inputSearchStyle={c.inputSearchStyle}
            iconStyle={c.iconStyle}
            data={item.options?.map((e) => ({ label: e?.name ?? e, id: e?.id ?? '' })) || []}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={Strings.selectItemTxt}
            searchPlaceholder={Strings.searchPlaceHolderText}
            value={item.value}
            onChange={(e) => onChange(item.type, index, e.label, e.id)}

          />
        </View>
      );

    case 'group_text':
      const vl = item?.value ?? []
      const left = vl[0]?.split('|') ?? [];
      const right = vl[1]?.split('|') ?? [];
      return (
        <View style={c.flexRowSpaceBetweenPadding0}>
          {['left', 'right'].map((side, idx) => (
            <View style={styles.width48} key={side}>
              <Text style={c.textTitleStyle} title={item.label.split('|')[idx]} />
              <View>
                {Array(item.limit).fill(null).map((_, i) => (
                  <Input
                    key={_ + i}
                    value={side == 'left' ? left[i] || "" : right[i] || ""}
                    onChangeText={(text) =>
                      onChange(item.type, index, text, i, side as 'left' | 'right')
                    }
                    showError={item?.error}
                    inputStyle={c.inputStyle}
                    placeholder={item.label.split('|')[idx]}
                    containerStyle={i !== 0 ? styles.inputOffmargin : undefined}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      );

    default:
      return <View style={c.h26} />;
  }

};

const parentView = () => ({ ...styles.radioViewRow, marginRight: 8 })

const touchableView = (item: boolean): TextStyle => ({
  ...styles.radioButton,
  borderWidth: item ? 2 : 1.2,
  borderColor: Colors.primary
})

const datePickerStyle = (error: boolean): TextStyle => ({
  alignSelf: 'center',
  borderRadius: 12,
  borderWidth: 1,
  height: 52,
  justifyContent: 'center',
  paddingHorizontal: 12,
  width: '100%',
   borderColor: error ? Colors.red : Colors.grey,
})

const dropDownStyle = (error: boolean): TextStyle => ({
  borderRadius: 8,
  borderWidth: 1,
  height: 50,
  paddingHorizontal: 8,
   borderColor: error ? Colors.red : Colors.grey,
})




export default React.memo(DynamicFormField);