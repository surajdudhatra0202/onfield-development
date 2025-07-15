import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Loader } from '@components';
import { Colors, ImageView, Strings } from '@constants';
import c from '@style';
import s from './styles';
import { Get } from '@services';
import { FAQS, PLANS, showPopupMessage } from '@utils';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NavigationProps } from '@/navigation/navigation';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Payment: React.FC<NavigationProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number>(-1);
  const [faqData, setFAQData] = useState<string[]>([]);
  const [faqTitle, setFAQTitle] = useState<string>('');
  const [activeFAQ, setActiveFAQ] = useState<number>(-1);
  const [plansData, setPlansData] = useState({});

  useEffect(() => {
    fetchPlans();
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, status } = await Get(FAQS);
      if (status) {
        setFAQData(data?.faqs);
        setFAQTitle(data?.label);
      }
    } catch (e) {
      console.log('FAQ fetch error', e);
    }
  };

  const fetchPlans = async () => {
    try {
      const { data } = await Get(PLANS);
      setPlansData(data);
    } catch (e) {
      console.log('Plan fetch error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFAQToggle = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveFAQ(index === activeFAQ ? -1 : index);
  }, [activeFAQ]);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
  };

  const onContinue = () => {
    if (selectedPlan === -1) {
      showPopupMessage(Strings.error, Strings.plsSPackage, true);
    } else {
      showPopupMessage(`${Strings.welcomeTxt} name`, Strings.accCreateMsg, false);
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  };

  const renderPlanCard = (index: number, title: string, price: number, monthly: number) => (
    <Pressable
      onPress={() => handlePlanSelect(index)}
      style={pressableCss(selectedPlan === index)}
    >
      {index === 1 && (
        <View style={s.bgTag}>
          <Text title={`${Strings.bestValue} - ${Strings.saveText} 10%`} style={c.textSemiBold14White} />
        </View>
      )}

      <View style={s.cardInside}>
        <View>
          <Text title={title} style={c.textBold} />
          <Text title={`₹${price}/-`} style={s.priceValueSize} />
          <Text title={`${Strings.includes} ${plansData?.trial_days}-${Strings.freeDayTrial}`} style={s.priceTextSize} />
        </View>
        <View>
          <Text title={`₹${monthly}/-`} style={c.textSemiBold15} />
          <Text title={Strings.perMonthTxt} style={s.fontSizePerMonth} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView edges={['bottom']} style={c.flex1W}>
      <TouchableOpacity onPress={navigation.goBack} style={s.backIcon}>
        <Image source={ImageView.back} style={c.img20Black} />
      </TouchableOpacity>

      <ScrollView style={s.marginH20}>
        <Text title={Strings.chooseYourPlanText} style={s.choosePlanText} />

        {renderPlanCard(1, Strings.yearlyText, plansData?.eng_fee_yearly, plansData?.eng_fee_yearly_per_month)}
        <View style={c.h12} />
        {renderPlanCard(2, Strings.yearlyText, plansData?.eng_fee_yearly, plansData?.eng_fee_yearly_per_month)}

          <Text
            top={1}
            bottom={18}
            title={`* ₹${plansData?.setup_fee}/-   ${Strings.oneTimefeeMsg}`}
            style={s.oneTimeSetupText}
          />

        <Button
          onPress={onContinue}
          textColor={Colors.white}
          style={c.buttonStyle}
          text={Strings.continue}
          icon="arrow-right"
        />

        {faqData.length > 0 && (
          <View>
            <Text 
               top={32} 
               bottom={8}
               style={c.textBold}
               title={faqTitle} 
               />
              {faqData.map((item, i) => (
                <View key={item.ans + i} style={s.faqCard}>
                  
                  <TouchableOpacity
                    style={s.faqRowStyle}
                    onPress={() => handleFAQToggle(i)}>
                    <Text top={6} title={item.que} style={c.textSemiBold14} />
                    <Icon
                      name={activeFAQ === i ? 'minus-circle-outline' : 'plus-circle-outline'}
                      size={24}
                      color={Colors.black}
                    />
                  </TouchableOpacity>

                  <Collapsible collapsed={activeFAQ !== i}>
                    <Text title={item.ans} style={s.innerLowerCardTextFaq} />
                  </Collapsible>
                </View>
              ))}
          </View>
        )}
      </ScrollView>

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

const pressableCss = (plan : boolean) : TextStyle => ({
...c.boxStyle,
elevation: plan ? 2 : 0,
borderColor: plan ? Colors.primary : Colors.light_gray,
})

export default Payment;
