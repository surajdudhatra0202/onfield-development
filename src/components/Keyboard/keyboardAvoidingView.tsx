import React from 'react';
import type {
  KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import c from '@style';

const KeyboardAvoidingView: React.FC<KeyboardAwareScrollViewProps> = (props) => {
  const defaultProps = {
    contentContainerStyle: { flexGrow: 1 },
    bounces: false,
    bouncesZoom: false,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,
    enableOnAndroid: true, // Default to true
  };

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      style={props.style ?? c.flex1}
      {...defaultProps}
      {...props}
    />
  );
};

export default KeyboardAvoidingView;
