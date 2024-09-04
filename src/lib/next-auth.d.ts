import NextAuth from 'next-auth' // eslint-disable-line @typescript-eslint/no-unused-vars

interface IUser {
  blocked: boolean,
  confirmed: boolean,
  createdAt: string,
  email: string,
  firstName: string | null,
  id: number,
  lastName: string | null,
  phoneNumber: number | string | null,
  provider: string,
  updatedAt: string,
  username: string
}

declare module 'next-auth' {
  interface Session {
    user: {
      jwt: string,
      user: IUser,
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string,
    user: IUser
  }
}