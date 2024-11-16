import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      name: "google",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      name: "facebook",
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
      name: "apple",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectToDB()

          const user = await User.findOne({ email })
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: " + error);
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDB();
        
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            role: 'Investor',
            completedProfile: false,
          });

          if (profile) {
            newUser.name = profile.name || newUser.name;
          }

          await newUser.save();
        }
        
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const payload = {
          id: user._id,
          email: user.email,
          role: user.role,
          completedProfile: user.completedProfile,
        };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        token.jwt = jwtToken;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
