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

  const pdfName = 'ODR_' + params?.order_no;

  const downloadPdf = async () => {
    try {
      setLoading(true);

      if (Platform.OS === 'android') {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          showPopupMessage(Strings.error, 'Storage permission denied', true);
          setLoading(false);
          return;
        }
      }

      const fileName = `${pdfName}.pdf`;
      const downloadPath = `/storage/emulated/0/Download/${fileName}`;

      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: 'Downloading PDF file',
          mime: 'application/pdf',
          mediaScannable: true,
          path: downloadPath,
        },
      }).fetch('GET', URL);

      console.log('Download completed:', response.path());
      showPopupMessage(Strings.success, 'PDF downloaded successfully!', false);
    } catch (error) {
      console.error('Download error:', error);
      showPopupMessage(Strings.error, 'Download failed. Please try again.', true);
    } finally {
      setLoading(false);
    }
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
