import { ModalView } from '@/components';
import { Colors, Constants, Strings } from '@/constants';
import c from '@/style';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { requestStoragePermission, showPopupMessage } from '@/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';

interface PdfViewProps {
  visible: boolean;
  onClose: () => void;
  src?: string;
  params?: any;
}

const PdfView: React.FC<PdfViewProps> = ({ visible, onClose, params, src }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const URL = Constants.PANEL_URL + src;

  const pdfSrc = {
    uri: URL,
  };

  // console.log('paramssssss', pdfSrc);

  const pdfName = 'ODR_' + params?.order_no;

  // console.log(pdfName, params, 'pdfname');

  const downloadPdf = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Storage permission denied');
        showPopupMessage(Strings.error, 'Storage permission denied', true);
        return;
      }
    }

    const { config, fs } = ReactNativeBlobUtil;
    const dirs = fs.dirs;

    const downloadDir = Platform.select({
      ios: '/storage/emulated/0/Download',
      android: '/storage/emulated/0/Download',
    });

    const filePath = `${downloadDir}/${pdfName}.pdf`;

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // Use Android's native download manager
        notification: true, // Show download notification
        mediaScannable: true, // Make the file visible in media galleries
        title: pdfName,
        path: filePath,
      },
    })
      .fetch('GET', URL)
      .then((res) => {
        console.log('The filed saved to', res.path());
      })
      .catch((error) => {
        console.error('Download err');
        console.error('📛 Full error object:', error);
        showPopupMessage(Strings.error, 'Download error', true);
      });
  };

  return (
    <ModalView visible={visible} onClose={onClose}>
      <SafeAreaView style={c.flex1}>
        <View style={styles.pdfContainer}>
          <View style={styles.topActions}>
            <TouchableOpacity onPress={downloadPdf} style={styles.closeBtn}>
              <MaterialIcons name="file-download" size={25} color={Colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={25} color={Colors.red} />
            </TouchableOpacity>
          </View>

          <View style={styles.pdfViewStyle}>
            <Pdf
              source={pdfSrc}
              style={styles.pdfStyle}
              trustAllCerts={false}
              page={1}
              onLoadProgress={() => setLoading(true)}
              onLoadComplete={() => setLoading(false)}
            />
          </View>
        </View>
      </SafeAreaView>
    </ModalView>
  );
};

export default PdfView;
