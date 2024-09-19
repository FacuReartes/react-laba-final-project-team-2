export type ImageType = {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
};

export type Gender = {
  id: number;
  attributes: {
    name: string;
  };
};

export type Sizes = {
  id: number;
  attributes: {
    value: number;
  };
};

export type Color = {
  id: number;
  attributes: {
    name: string;
  };
};

export type Categories = {
  id: number;
  attributes: {
    name: string;
  };
};

export type ProductType = {
  id: number;
  attributes: {
    name: string;
    images: {
      data: ImageType[];
    };
    description: string;
    price: number;
    teamName: 'team-1' | 'team-2' | 'team-3' | 'team-5';
    gender: {
      data: Gender;
    };
    sizes: {
      data: Sizes[];
    };
    color: {
      data: Color;
    };
    categories: {
      data: Categories[];
    };
  };
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

export type SignInFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};
