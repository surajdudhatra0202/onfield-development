/* eslint-disable react-native/no-inline-styles */
import { Text } from '@components';
import { Colors } from '@constants';
import c from '@style';
import React from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';
import { TextInput as RNTextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

interface CustomTextInputProps extends TextInputProps {
  innerRef?: React.Ref<RNTextInput>;
  showError?: boolean;
  errorMesssage?:string;
  title?: string;
  containerStyle?: object;
  inputStyle?: ViewStyle;
  placeholderTextColor?: string;
  multiline?: boolean;
  icon?: string;
  icon2?: string;
  showPass?: () => void;
  iconSize?: number;
  stop?: boolean;
  rightIconStyle?: object;
  borderWidth?: number;
  borderColor?: string;
  inputHeight?: number;
}

export default function TextInput({
  innerRef,
  showError,
  errorMesssage,
  title,
  onSubmitEditing,
  containerStyle,
  value,
  inputStyle,
  placeholderTextColor,
  multiline,
  icon,
  icon2,
  showPass,
  iconSize,
  stop,
  rightIconStyle,
  borderWidth,
  borderColor,
  inputHeight,
  ...props
}: Readonly<CustomTextInputProps>): React.ReactElement {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={c.textTitleStyle} title={title} />}
      <View
        style={[
          styles.inputWrapper,
          inputStyle,
          {
            borderRadius: inputStyle?.borderRadius ?? 8,
            borderColor: borderColor ?? (showError ? Colors.red : Colors.grey),
            borderWidth: borderWidth ?? (stop ? 0 : 1),
            height: inputHeight ?? inputStyle?.height,
            alignItems: multiline ? 'flex-start' : 'center',
          },
        ]}
      >
        {icon && (
          <Icon style={styles.padding6} name={icon} size={iconSize ?? 20} color={Colors.primary} />
        )}

        <RNTextInput
          style={[styles.inputText, { textAlignVertical: multiline ? 'top' : 'center' }]}
          ref={innerRef}
          value={value}
          selectionColor={Colors.primary}
          underlineColorAndroid="transparent"
          placeholderTextColor={placeholderTextColor ?? '#8A9199'}
          multiline={multiline}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />

        {icon2 && (
          <Icon
            onPress={showPass}
            style={rightIconStyle ?? styles.eye}
            name={icon2}
            size={20}
            color={Colors.primary}
          />
        )}
      </View>

      {showError && <Text title={errorMesssage} style={c.errorStyle} />}
    </View>
  );
}
