import { ModalView } from '@/components';
import { Colors, Strings } from '@/constants';
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

  const pdfSrc = {
    uri: src,
  };

  const pdfName = 'ODR' + params.order_no;

  // console.log(params);

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
      android: dirs.DownloadDir,
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
      .fetch('GET', src)
      .then((res) => {
        console.log('The filed saved to', res.path());
      })
      .catch((error) => {
        console.error('Download err');
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
