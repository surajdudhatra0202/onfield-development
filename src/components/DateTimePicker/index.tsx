import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateTimePickerProps = {
  isVisible: boolean;
  mode: 'datetime' | 'date' | undefined;
  minimumDate?: Date;
  maximumDate?: Date;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const DateTimePicker = ({
  isVisible,
  mode,
  minimumDate,
  maximumDate,
  onConfirm,
  onCancel,
}: DateTimePickerProps) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onConfirm={onConfirm}
      onCancel={onCancel}
      locale="en_GB"
    />
  );
};
export default React.memo(DateTimePicker);
