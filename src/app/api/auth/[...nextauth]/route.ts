import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        password: { label: 'Password', type: 'password' }
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }
