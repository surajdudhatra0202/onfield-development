type FontScalableComponent = ComponentType<{ allowFontScaling?: boolean }> & {
  defaultProps?: { allowFontScaling?: boolean };
};

export interface DrawerItem {
  name: string;
  nav: string;
  icon: string;
}

export interface LoginResponse {
  file_base_url: string;
  data: AuthData
  drawer_data: DrawerItem[];
  note: string;
  message: string;
  status: boolean;
}


export interface AuthData {
  id: number;
  signature: string;
  type_id: number;
  name: string;
  email: string;
  company: string;
  file_base_url: string;
  note: string;
  token: string;
  day_started?: number
}

type ApiResponse = {
  status: boolean;
  message: string;
  data: Data;
};

type data = {
  status: boolean,
  message: string
}


interface FieldData {
  name: string;
  label: string;
  type: string;
  value: string | undefined;
  options?: string[];
  limit?: number;
  required?: number;
  error?:boolean
}