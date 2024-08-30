export type ProductType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  price: number;
  gender: 'Man' | 'Woman' | 'Unisex';
};

export type SettingsFormData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};
