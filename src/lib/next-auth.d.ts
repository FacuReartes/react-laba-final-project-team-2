import NextAuth from 'next-auth'; // eslint-disable-line @typescript-eslint/no-unused-vars

interface IAvatarFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

interface IAvatar {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: IAvatarFormat;
    small?: IAvatarFormat;
    medium?: IAvatarFormat;
    large?: IAvatarFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  firstName: string | null;
  id: number;
  lastName: string | null;
  phoneNumber: number | string | null;
  provider: string;
  updatedAt: string;
  username: string;
  avatar?: IAvatar | null;
  products?: string[] | null;
}

declare module 'next-auth' {
  interface Session {
    user: {
      jwt: string;
      user: IUser;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
    user: IUser;
  }
}
