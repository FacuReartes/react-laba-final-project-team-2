import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

const authOptions: NextAuthOptions = {

  pages: {
    signIn: '/auth/sign-in'
  },

  session: {
    strategy: 'jwt'
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'RememberMe', type: 'checkbox' }
      },
      async authorize(credentials) {

        const res = await fetch('https://shoes-shop-strapi.herokuapp.com/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            identifier: credentials?.identifier,
            password: credentials?.password
          })
        });

        const user = await res.json();

        if (res.ok && user) {

          cookies().set('remember-me', credentials?.rememberMe === 'true' ? 'true' : 'false')

          return user
        } else {
          return null
        }
      }
    })
  ], 

  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user}
    },

    async session({ session, token}) {
      session.user = token
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
};

const handler = async (req: NextRequest, res: NextResponse) => {
  const remember = cookies().get('remember-me')

  const maxAge = remember?.value === 'true' ? (60 * 60 * 24 * 30) : (60 * 60 * 12);

  return NextAuth(req as unknown as NextApiRequest, res as unknown as NextApiResponse, {
    ...authOptions,
    session: { maxAge: maxAge }
  })
}

export { handler as GET, handler as POST }
