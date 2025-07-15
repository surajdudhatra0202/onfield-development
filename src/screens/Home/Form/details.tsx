import { Image, ScrollView, View } from 'react-native';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { Button, Seperator, Text, InfoRow, Loader, ImageGrid } from '@components';
import c from '@style';
import styles from '../styles';
import { StorageKey, Strings } from '@constants';
import { Post } from '@services';
import { showPopupMessage, PrefManager, START_WORK, getLocation, CALLDETAIL } from '@utils';
import { Routes } from '../../../navigation/route';
import { NavigationProps } from '@/navigation/navigation';
import { AuthData } from '@/types/global';
import { GeoCoordinates } from 'react-native-geolocation-service';

type CallInfo = Record<string, unknown>;

const InfoSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.cardShadow}>
    <View style={styles.viewHeader}>
      <Text title={title} style={styles.headingText} />
    </View>
    <View style={styles.viewStyle1}>{children}</View>
  </View>
);

const CallDetails = ({ navigation, callInfoProps, from }: NavigationProps) => {

  const [callInfo, setCallInfo] = useState<CallInfo>({});
  const [formData, setFormData] = useState<CallInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dayStarted, setDayStarted] = useState<boolean>(false);
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [onNextLoading, setOnNextLoading] = useState<boolean>(false);

  useEffect(() => {
    getCallDetails();
  }, []);

  const getCallDetails = async () => {
    try {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        call_id: callInfoProps.id
      };
      const { data, message } = await Post(CALLDETAIL, request);
      if (data.status) {
        setCallInfo(data.data.call);
        setBaseUrl(data?.data?.file_base_url ?? '')
        setDayStarted(data?.data?.dayStarted ?? false)
        if (from === 1) {
          setFormData(data?.data?.data);
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

  const fetchAndStoreLocation = async () => {
    const coords = await getLocation();

    if (coords) {
      return coords
    } else {
      setOnNextLoading(false);
    }
  };

  const onStartWork = async () => {
    try {
      setOnNextLoading(true);
      const coords: GeoCoordinates | undefined = await fetchAndStoreLocation();
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = {
        user_id: authData.id,
        call_id: callInfoProps.id,
        s_lat_lon: `${coords?.latitude},${coords?.longitude}`
      };
      const { data, message } = await Post(START_WORK, request);

      if (data.status) {
        setDayStarted(true)
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setOnNextLoading(false);
    }
  }

  const onNext = () => {
    navigation.navigate(Routes.Form, {
      callInfoProps: callInfoProps,
      formData: formData,
    });
  };

  const renderInfoRowGroup = useCallback((data: string[], groupKey: string) => (
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
      )
    })
  ), []);

  return (
    <View style={c.flex1W}>
      <ScrollView style={c.flex1WHorizontal}>
        {Object.entries(callInfo).length === 0 && !loading ? (
          <View style={c.rootCenter}>
            <Text top={'4%'} title="No call information available." style={c.textBold} />
          </View>
        ) : (
          Object.entries(callInfo).map(([sectionTitle, content], i) => (
            <InfoSection key={sectionTitle + i} title={sectionTitle}>
              {sectionTitle == 'Signature' || sectionTitle == 'Photos' ?
                <ImageGrid
                  numColumns={2}
                  baseUrl={baseUrl}
                  images={Array.isArray(content) ? content : [content]}
                />
                :
                <>
                  {Array.isArray(content)
                    ? renderInfoRowGroup(content, sectionTitle)
                    : renderInfoRowGroup([content], sectionTitle)}
                </>
              }

            </InfoSection>
          ))
        )}

        <View style={c.h26} />
      </ScrollView>

      {from == 1 && Object.entries(callInfo).length !== 0 && !loading && (
        <Button
          text={dayStarted ? Strings.continue : Strings.checkInStartCall}
          bottom={8}
          loading={onNextLoading}
          onPress={dayStarted ? onNext : onStartWork}
          icon={'arrow-right-thick'}
          style={c.buttonStyle}
        />
      )}
      <Loader visible={loading} />
    </View>
  );
};

export default CallDetails;