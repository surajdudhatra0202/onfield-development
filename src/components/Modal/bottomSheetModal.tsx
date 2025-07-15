
import React, { ReactNode, forwardRef, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { ViewStyle } from 'react-native';

interface Props {
  props?:  React.ReactNode;
  snapPoints?: string[];
  style?: ViewStyle;
  children?: ReactNode;
  bottomInset?: number
}

const BottomSheetModal = forwardRef<BottomSheet, Props>(({
  snapPoints,
  children,
  style,
  bottomInset,
  ...props
}, ref) => {

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        enableTouchThrough={false}
        pressBehavior={'close'}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      bottomInset={bottomInset ? bottomInset : 0}
      detached={true}
      animateOnMount
      index={-1}
      enablePanDownToClose
      style={style}
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={true}
      {...props}>
      {children}
    </BottomSheet>
  );
}
);
export default BottomSheetModal;
