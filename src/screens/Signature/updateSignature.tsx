import { Button, Header } from '@components';
import { Colors, Constants, StorageKey, Strings } from '@constants';
import c from '@style';
import { PrefManager, showPopupMessage, UPLOAD_SIGNATURE } from '@utils';
import React, { ComponentRef, useEffect, useRef, useState } from 'react';
import { Image, Text as T, View } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { Post } from '@services';
import styles from './styles';
import type { NavigationProps } from '@/navigation/navigation';
import { ApiResponse, AuthData } from '@/types/global';

const imgWidth = Constants.width;
const imgHeight = Constants.height - 140;
const style = `
  .m-signature-pad {
    box-shadow: none !important;
    border: none !important;
  }

  .m-signature-pad--body {
    border: none !important;
  }

  .m-signature-pad--footer {
    display: none !important;
    margin: 0 !important;
  }

  html, body {
    width: ${imgWidth}px !important;
    height: ${imgHeight}px !important;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;


const UpdateSignature = ({ navigation, route }: NavigationProps) => {

  const isBack = route?.params?.from // this is mean user come from attachment screen

  const [signatureUrl, setSignatureUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [typedSignature, setTypedSignature] = useState('');

  const ref = useRef<ComponentRef<typeof SignatureScreen>>(null);

  useEffect(() => {
    async function getSignature() {
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
      setSignatureUrl(authData?.file_base_url + authData?.signature);
    }
    if (!isBack) {
      getSignature();
    }
  }, []);

  const saveSignature = async (ss: string) => {
    console.log(ss);
    
    try {
      if(isBack){
        navigation.goBack()
        route?.params?.callback(ss)
        return
      }

      setLoading(true);

      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo)
      const request = {
        user_id: authData.id,
        signature: ss,
      };
      const { data, message } = await Post(UPLOAD_SIGNATURE, request) as ApiResponse;

      if (data.status) {
        setSignatureUrl(ss);
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    ref.current.readSignature();
    
  };

  const handleEnd = () => {
    setSignatureUrl('');
    setTypedSignature('');
    if (ref.current) {
      ref.current.clearSignature();
    }
  };

  const openDrawer = () => isBack ? navigation.goBack() : navigation.openDrawer();
  const hasSignature = !!(signatureUrl || typedSignature);

  return (
    <View style={c.flex1P}>
      <Header
        isBack={isBack}
        onPress={openDrawer}
        title={Strings.signatureTxt} />

      <View style={styles.signatureSection}>
        <T style={styles.addSignatureTextStyle}>{Strings.drawSignature}</T>

        <View style={styles.signatureBox}>
          {signatureUrl ? (
            <Image
              source={{ uri: signatureUrl }}
              style={{ width: imgWidth, height: imgHeight }}
            />
          ) : (
            <SignatureScreen
              ref={ref}
              onOK={saveSignature}
              autoClear={false}
              descriptionText=""
              bgWidth={imgWidth}
              bgHeight={imgHeight}
              webStyle={style}
            />
          )}
        </View>
      </View>

      <View style={c.buttonRowStyle}>
        <Button
          loading={false}
          text={Strings.reset}
          onPress={handleEnd}
          icon={'restart'}
          style={c.buttonSaveStyle}
        />

        <Button
          loading={loading}
          onPress={handleSave}
          textColor={Colors.white}
          disabled={hasSignature}
          style={c.buttonNextStyle}
          text={Strings.saveText}
          icon="check"
        />
      </View>
    </View>
  );
};

export default UpdateSignature;