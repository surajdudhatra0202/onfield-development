import { ScrollView, View } from 'react-native';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { Seperator, Text, InfoRow, Loader, Header, Button } from '@components';
import c from '@style';
import styles from '../Home/styles';
import { Constants, StorageKey, Strings } from '@constants';
import { Post } from '@services';
import { showPopupMessage, PrefManager, ORDER_DETAILS } from '@utils';
import { NavigationProps } from '@/navigation/navigation';
import { AuthData } from '@/types/global';
import PdfView from '../Shared/Pdf';

type CallInfo = Record<string, unknown>;

const InfoSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.cardShadow}>
    <View style={styles.viewHeader}>
      <Text title={title} style={styles.headingText} />
    </View>
    <View style={styles.viewStyle1}>{children}</View>
  </View>
);

const CallDetails = ({ navigation, route }: NavigationProps) => {
  const { orderInfo } = route.params;

  const [callInfo, setCallInfo] = useState<CallInfo>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [viewPdf, setViewPdf] = useState<boolean>(false);

  const src = Constants.PANEL_URL + 'master-order/order-pdf/dFJEYjNFalVpRnozcTArWVNXc1N2Zz09';

  useEffect(() => {
    getCallDetails();
  }, []);

  const getCallDetails = async () => {
    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        order_id: orderInfo.id,
      };
      const { data, message } = await Post(ORDER_DETAILS, request);
      if (data.status) {
        setCallInfo(data?.data?.orders ?? {});
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const pdfviewer = () => {
    setViewPdf(true);
  };

  const renderInfoRowGroup = useCallback(
    (data: string[], groupKey: string) =>
      data.map((row, i) => {
        return (
          <React.Fragment key={`${groupKey}-${i}`}>
            {Object.entries(row).map(([key, value], j) => (
              <React.Fragment key={`${groupKey}-${i}-${j}`}>
                <InfoRow title={key} value={value ?? Strings.na} />
                <Seperator padding={2} borderHeight={-1} />
              </React.Fragment>
            ))}
            {i < data.length - 1 && <Seperator style={styles.seperatorStyle} borderHeight={0} />}
          </React.Fragment>
        );
      }),
    [],
  );

  const goBack = () => navigation.goBack();
  const headerName = `Order-${orderInfo?.order_no ?? '-'}`;

  return (
    <View style={c.flex1W}>
      <Header isBack onPress={goBack} title={headerName} />

      <ScrollView style={c.flex1WHorizontal}>
        {Object.entries(callInfo).length === 0 && !loading ? (
          <View style={c.rootCenter}>
            <Text top={'4%'} title="No call information available." style={c.textBold} />
          </View>
        ) : (
          Object.entries(callInfo).map(([sectionTitle, content], i) => (
            <InfoSection key={sectionTitle + i} title={sectionTitle}>
              {Array.isArray(content)
                ? renderInfoRowGroup(content, sectionTitle)
                : renderInfoRowGroup([content], sectionTitle)}
            </InfoSection>
          ))
        )}

        <View style={c.h26} />
        <Button style={c.buttonSaveStyle} loading={loading} text="View PDF" onPress={pdfviewer} />
      </ScrollView>

      {viewPdf && (
        <PdfView visible={viewPdf} onClose={() => setViewPdf(false)} params={orderInfo} src={src} />
      )}

      <Loader visible={loading} />
    </View>
  );
};

export default CallDetails;
