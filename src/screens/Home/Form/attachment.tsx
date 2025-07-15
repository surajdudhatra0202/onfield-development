import React, { useMemo, useRef, useState } from 'react';
import { Image, ImageProps, ScrollView, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, Button, ImageGrid, Text } from '@/components';
import { NavigationProps } from '@/navigation/navigation';
import { Colors, ImageView, StorageKey, Strings } from '@constants';
import c from '@style';
import s from "../styles";
import { Routes } from '@/navigation/route';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import styles from '../styles';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import { ApiResponse, AuthData } from '@/types/global';
import { CALLS_SAVE, PrefManager, showPopupMessage } from '@/utils';
import { Post } from '@/services';

const Attachment = ({ navigation, route }: NavigationProps) => {
  const { callInfoProps } = route.params;

  const [imageData, setImageData] = useState<ImageOrVideo[]>([]);
  const [signature, setSignature] = useState<string>("");
  const [submit, setSubmit] = useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ['28%'], []);

  const onSave = async () => {
    try {
      setSubmit(true);
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const formData = new FormData();
      formData.append('call_id', callInfoProps.id);
      formData.append('complete', 1);
      formData.append('complete_type', 2);
      formData.append('signature', signature);
      formData.append('user_id', authData.id);
      imageData.forEach((e: any) => {
        formData.append('photo[]', {
          uri: e.path,
          name: e.filename,
          type: e.mime,
        });
      });

      const { data, message } = await Post(CALLS_SAVE, formData, true) as ApiResponse;
      if (data?.status) {
        navigation.reset({ index: 0, routes: [{ name: Routes.Home }] });
        showPopupMessage(data.status ? Strings.success : Strings.error, data.message ?? message, false);
      } else {
        showPopupMessage(data.status ? Strings.success : Strings.error, data.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setSubmit(false);
    }
  }

  const chooseProfileImage = async (): Promise<void> => {
    try {
      const res = await ImagePicker.openPicker(openPickerOption);
      if (res) {
        const images = Array.isArray(res) ? res : [res];
        setImageData([...imageData, ...images]);
      }
    } catch {
      // handle cancel or error if needed
    } finally {
      bottomSheetRef.current?.close();
    }
  };

  const onOpenCamera = async () => {
    try {
      const res = await ImagePicker.openCamera(openCameraOption)
      if (res) {
        imageData.push(res);
        setImageData([...imageData]);
      }
    } catch {
      // handle cancel or error if needed
    } finally {
      bottomSheetRef.current?.close();
    }
  };

  const handleAddSignature = () => {
    navigation.navigate(Routes.UpdateSignature, {
      from: 'attachment',
      callback: setSignature
    });
  }

  const handleAddPhoto = () => bottomSheetRef.current?.expand();

  return (
    <View style={c.flex1W}>
      <Text
        paddingH={24}
        numberOfLines={4}
        top={18}
        textAlign="center"
        style={c.textTitleStyle}
        title={Strings.toCompleteProcessMsg}
      />
      <ScrollView>
        <RowButton title={signature ? Strings.updateSignature : Strings.addSignature} onPress={handleAddSignature} />
        {signature && (
          <View style={styles.signatureViewStyle}>
            <Image source={{ uri: signature }} style={styles.signatureStyle} />
          </View>
        )}
        <RowButton title={Strings.addPhoto} onPress={handleAddPhoto} />

        <ImageGrid
          images={imageData}
          onRemove={(index) => {
            const newImages = [...imageData];
            newImages.splice(index, 1);
            setImageData(newImages);
          }}
        />

        <View style={c.h100} />
      </ScrollView>

      <View style={styles.buttonViewStyle}>
        <Button
          text={Strings.complete}
          bottom={8}
          disabled={signature == "" || imageData.length == 0}
          onPress={onSave}
          loading={submit}
          icon={'arrow-right-thick'}
          style={s.buttonStyle}
        />
      </View>


      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={styles.modalStyle}>
        <View>
          <Text style={c.textBold} bottom={16} title={'Add Photos'} />
          <ActionRow icon={ImageView.camera} title="Camera" onPress={onOpenCamera} />
          <View style={c.h12} />
          <ActionRow icon={ImageView.gallery} title="Choose from gallery" onPress={chooseProfileImage} />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const RowButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={s.rowButtonStyle} onPress={onPress}>
      <Text title={title} color={Colors.drawerColor} style={c.textMedium14} />
      <Image resizeMode='contain' source={ImageView.rightArrow} style={c.img16} />
    </TouchableOpacity>
  );
}

const ActionRow = ({
  icon,
  title,
  onPress,
}: {
  icon: ImageProps;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.flexRow} onPress={onPress}>
    <Image
      tintColor={Colors.darkGrey}
      style={c.img30}
      resizeMode="contain"
      source={icon}
    />
    <Text style={c.textRegularGray} title={title} />
  </TouchableOpacity>
);

const openPickerOption: Options = {
  maxFiles: 10,
  multiple: true,
  cropping: true,
  mediaType: 'photo',
  cropperCircleOverlay: false,
  freeStyleCropEnabled: false,
  includeBase64: false,
  compressImageQuality: 0.60,
}

const openCameraOption: Options = {
  maxFiles: 10,
  multiple: true,
  cropping: true,
  mediaType: 'photo',
  cropperCircleOverlay: false,
  freeStyleCropEnabled: false,
  includeBase64: false,
  compressImageQuality: 0.60,
}

export default Attachment;