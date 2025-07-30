import React, { ReactNode, useMemo } from 'react';
import { TouchableOpacity, View, Image, Text as T, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import styles from './styles';
import { Colors, ImageView, Strings } from '@constants';
import c from '@style';
import moment from 'moment';
import { Button, InfoRow } from '@components';
import PdfView from '@/screens/Shared/Pdf';
import Feather from 'react-native-vector-icons/Feather';

type Status = 'Pending' | 'Approved' | 'Rejected' | 'High' | 'Medium' | 'Low';

interface ItemListViewProps {
  srNo?: string | number;
  onPress?: () => void;
  label?: string;
  value?: string;
  date?: Date | string;
  status?: Status;
  reason?: string;
  leaveDate?: string;
  pdfBtn?: () => void;
}

const ItemListView: React.FC<ItemListViewProps> = ({
  srNo,
  onPress,
  label,
  value,
  date,
  status,
  reason,
  leaveDate,
  pdfBtn
}) => {

  const getStatusImage = (status: Status) => {
    return (
      {
        Pending: ImageView.pendingImage,
        Approved: ImageView.approveImage,
        Rejected: ImageView.closeImage,
        High: ImageView.completedCall,
        Medium: ImageView.bell,
        Low: ImageView.futureCall,
      }[status] || ImageView.pendingImage
    );
  };

  const getColor = (status: Status) =>
    ({
      Pending: '#F7D51E1A',
      Approved: '#5FA65A1A',
      Rejected: '#E957591A',
      High: '#5FA65A1A',
      Medium: '#F7D51E1A',
      Low: '#E957591A',
    })[status] || '#F7D51E1A';

  const statusColor = useMemo(() => getColor(status ?? 'Pending'), [status]);
  const statusImage = useMemo(() => getStatusImage(status ?? 'Pending'), [status]);

  const labelArr = label?.split('|') ?? [];
  const valueArr = value?.split('|') ?? [];

  const circleInnerStyle: ViewStyle = useMemo(
    () => ({
      height: 45,
      width: 45,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: statusColor,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
    }),
    [statusColor],
  );

  return (
    <LinearGradient
      colors={[Colors.white, '#e1e9ff4d']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 1 }}
      style={c.viewStyle}
    >
      {/* <View style={styles.listMain} > */}
      <TouchableOpacity onPress={onPress} style={c.viewRootLisStyle} activeOpacity={0.8}>
        {status && (
          <View style={circleInnerStyle}>
            <Image resizeMode={'contain'} source={statusImage} style={c.img30} />
          </View>
        )}

        <View style={styles.cardMain}>
          {srNo && (
            <Text
              color={Colors.drawerColor}
              title={`${Strings.srno} ${srNo}`}
              style={c.textBold14}
            />
          )}

          {leaveDate && <Text title={leaveDate} color={Colors.drawerColor} style={c.textBold14} />}

          <View>
            {labelArr.map((e, index) => (
              <InfoRow key={`${e}-${index}`} title={e} value={valueArr[index] ?? ''} />
            ))}

            {date && <InfoRow title={Strings.dateTxt} value={moment(date).format('DD/MM/YYYY')} />}
            {reason && (
              <View style={styles.innerCardSection}>
                <T numberOfLines={5} style={c.textBold}>
                  <Text color={Colors.drawerColor} title={Strings.reason} style={c.textBold14} />
                  <T style={c.flex1}>
                    <Text title={`${reason}`} style={styles.leaveReasonText} />
                  </T>
                </T>
              </View>
            )}
          </View>
        </View>

        <Image source={ImageView.listShape} style={styles.imagebg} resizeMode="contain" />
      </TouchableOpacity>

      {pdfBtn && (
        <TouchableOpacity style={styles.downloadIcon} onPress={pdfBtn}>
          <Feather name="download" size={25} color={Colors.accent} />
        </TouchableOpacity>
      )}
    </LinearGradient>

  );
};

export default React.memo(ItemListView);
