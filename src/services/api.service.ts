import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { isLogout, PrefManager, showPopupMessage } from '@utils';
import { StorageKey } from '@/constants';

// Define the structure of error data
type ErrorData = {
  message?: string;
  errors?: { message?: string; msg?: string } | { msg?: string }[];
};

// Extract error message utility
const extractErrorMessage = (error: AxiosError<ErrorData>): string => {
  const data = error?.response?.data;

  if (data?.message) return data.message;

  const errors = data?.errors;
  if (Array.isArray(errors)) {
    return errors[0]?.msg ?? 'Something went wrong';
  }

  if (errors && typeof errors === 'object') {
    return errors.message || (errors as { msg?: string })?.msg || 'Something went wrong';
  }

  return 'Something went wrong';
};

// Inject token into config
const getAuthConfig = async (
  isMultipart: boolean = false
): Promise<AxiosRequestConfig> => {
  const userInfo = await PrefManager.getValue(StorageKey.userInfo);  
  return {
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      token: String(userInfo?.token ?? ''),
    },
  };
};


// POST
export async function Post<T = unknown, P = unknown>(
  url: string,
  payload?: P,
  isMultipart: boolean = false
): Promise<T> {
  try {
    const config = await getAuthConfig(isMultipart);
    const data  = await axios.post<T>(url, payload, config);
    if (data?.data?.status === "failed") isLogout()
    return data;
  } catch (error) {
    const err = error as AxiosError<ErrorData>;
    showPopupMessage('Error', extractErrorMessage(err), true);
    throw err?.response?.data ?? err;
  }
}



// PUT
export async function Put<T = unknown, P = unknown>(
  url: string,
  payload: P
): Promise<T> {
  try {
    const config = await getAuthConfig();
    const response: AxiosResponse<T> = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorData>;
    showPopupMessage('Error', extractErrorMessage(err), true);
    throw err?.response?.data ?? err;
  }
}



// GET
export async function Get<T = unknown>(url: string): Promise<T> {
  try {
    const config = await getAuthConfig();
    const response: AxiosResponse<T> = await axios.get(url, config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorData>;
    showPopupMessage('Error', extractErrorMessage(err), true);
    throw err?.response?.data ?? err;
  }
}



// DELETE
export async function Delete<T = unknown>(url: string): Promise<T> {
  try {
    const config = await getAuthConfig();
    const response: AxiosResponse<T> = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorData>;
    showPopupMessage('Error', extractErrorMessage(err), true);
    throw err?.response?.data ?? err;
  }
}
