import { useState } from 'react';

interface FormFields {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export function useSignUpForm(initialValues: FormFields) {
  const [form, setForm] = useState<FormFields>(initialValues);

  const handleChange = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    handleChange,
  };
}
