import { useState } from 'react';

interface FormFields {
  email: string;
  password: string;

  loading: boolean;
  passHide: boolean;
  isSelected: boolean;
}

export function useLoginForm(initialValues: FormFields) {
  const [form, setForm] = useState<FormFields>(initialValues);

  const handleChange = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    handleChange,
  };
}
