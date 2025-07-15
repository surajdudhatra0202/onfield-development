import { FlatList, TouchableOpacity, View, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, FormHeader, Input, KeyboardAvoidingView, Text } from '@components';
import { Colors, ImageView, StorageKey, Strings } from '@constants';
import c from '@style';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import type { NavigationProps } from '@/navigation/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { AuthData } from '@/types/global';
import { CATEGORIES, ITEMS, PrefManager, SAVE_ORDER, showPopupMessage } from '@/utils';
import { Post } from '@/services';

const TextView = (key: string, value: string) => {
  return (
    <View style={c.flexRow}>
      <Text title={key} width={'20%'} style={c.textRegularGray} />
      <Text title={':  '} style={c.textRegularGray} />
      <Text title={value} color={Colors.primary} style={c.textBold} />{/* flex 1  */}
    </View>
  );
};

const AddOrder = ({ navigation }: NavigationProps) => {
  const [category, setCategory] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCallAndItemDetails('useEffect');
  }, []);

  const getCallAndItemDetails = async (from: string, id?: number) => {
    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      setCustomerName(authData?.name ?? '')

      const request = {
        user_id: authData.id,
        ...(from == 'dropdown' && {
          "category": id,
          "page": 1
        })
      };

      const API_URL = from == 'useEffect' ? CATEGORIES : ITEMS;
      const { data, message } = await Post(API_URL, request);

      if (data.status) {
        if (from === 'useEffect') {
          setCategoryData(data?.data ?? []);
        } else if (from === 'dropdown') {
          setItemData(data?.data ?? [])
        }
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const onCustomerChange = (item) => {
    setCategory(item);
    getCallAndItemDetails('dropdown', item.id);
  };

  const onNext = async () => {
    setLoading(true)
    const items = itemData.map(e => {
      return { item_id: e.id, qty: e.qty }
    })

    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        category: category.id,
        items: items
      };
      const { data, message } = await Post(SAVE_ORDER, request);

      if (data.status) {
        goBack()
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  }

  const onIncrease = (index: number) => {
    itemData[index].qty += 1
    setItemData([...itemData])
  }

  const onDecrease = (index: number) => {
    if (itemData[index].qty == 1) {
      itemData[index].qty = 1
    } else {
      itemData[index].qty -= 1
    }
    setItemData([...itemData])
  };

  const handleInputChange = (text: string, index: number) => {
    let newQty = parseInt(text || "1")
    if (isNaN(newQty) || newQty < 1) {
      newQty = 1;
    }
    itemData[index].qty = newQty
    setItemData([...itemData])
  };

  const renderItem = ({ item, index }) => {
    return (
      <LinearGradient
        colors={['#FFFFFF', 'rgba(225, 233, 255, 0.3)']}
        locations={[0.198, 0.9645]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.48, y: 1 }}

        style={styles.listStyle}>
        <View style={c.width100}>
          <View>
            {TextView('Name', item.name)}
            {TextView('Code ', item.code)}
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => onDecrease(index)} style={styles.button}>
              <Icon2 name="remove" size={11} color="#818181" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              textAlign='center'
              value={item.qty.toString()}
              maxLength={3}
              onChangeText={(text) => handleInputChange(text, index)}
            />

            <TouchableOpacity onPress={() => onIncrease(index)} style={styles.button}>
              <Icon2 name="add" size={11} color="#818181" />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={ImageView.curve} style={styles.listImg} />
      </LinearGradient>
    );
  };

  const ListFooterComponent = () => <View style={c.h26} />;
  const goBack = () => navigation.goBack();

  return (
    <View style={c.flex1P}>
      <FormHeader isBack onPress={goBack} title={Strings.addOrder} />

      <KeyboardAvoidingView nestedScrollEnabled style={c.formHeaderViewStyle}>
        <Input
          title={Strings.customerName}
          inputStyle={c.inputStyle}
          placeholder={Strings.customerName}
          value={customerName}
          onChangeText={setCustomerName}
          editable={false}
        />

        <View style={c.marginV12}>
          <Text style={c.textTitleStyle} title={Strings.categoryTxt} />

          <Dropdown
            style={c.dropdown}
            placeholderStyle={c.placeholderStyle}
            selectedTextStyle={c.selectedTextStyle}
            inputSearchStyle={c.inputSearchStyle}
            iconStyle={c.iconStyle}
            data={categoryData}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={Strings.selectItemText}
            searchPlaceholder={Strings.searchPlaceHolderText}
            value={category?.name || ''}
            onChange={onCustomerChange}
            renderLeftIcon={() => (
              <Icon style={c.marginRight5} color={Colors.primary} name="account-group" size={20} />
            )}
          />
        </View>

        <FlatList
          style={c.flex1}
          data={itemData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
        />
      </KeyboardAvoidingView>

      <View style={c.colorWhite}>
        {itemData.length !== 0 && (
          <Button
            text={Strings.saveText}
            bottom={8}
            onPress={onNext}
            loading={loading}
            icon={'arrow-right-thick'}
            style={c.buttonStyle}
          />
        )}
      </View>
    </View>
  );
};

export default AddOrder;