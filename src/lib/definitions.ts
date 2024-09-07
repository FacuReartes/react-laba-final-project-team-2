export type ProductType = {
  id: string;
  name: string;
  images: string;
  description: string;
  price: number;
  gender: 'Man' | 'Woman' | 'Unisex';
};

export type SettingsFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string;
  avatar?: object | string | null;
};

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};
