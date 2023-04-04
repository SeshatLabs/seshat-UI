// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import connectToDb from '../../../backend/connector/mongoConnector';
// import User from '../../../backend/entities/user.entity';

// export default async function auth(req, res) {
//   await dbConnect();

//   return NextAuth(req, res, {
//     providers: [
//       Providers.Credentials({
//         async authorize(credentials) {
//           const { username, password } = credentials;

//           const user = await User.findOne({ username });

//           if (!user || !(await user.comparePassword(password))) {
//             throw new Error("Invalid username or password");
//           }

//           return user;
//         },
//       }),
//       Providers.Google({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       }),
//     ],
//     adapter: MongoDBAdapter({
//       db: (await connectToDb()).connection.db,
//     }),
//     callbacks: {
//       async session(session, user) {
//         session.user.id = user.id;
//         return session;
//       },
//       async jwt(token, user, account) {
//         if (user) {
//           token.id = user.id;
//           token.username = user.username;
//           token.apiKey = user.apiKey;
//           token.role = user.role;
//         }
//         return token;
//       },
//     },
//   });
// }

import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ]
})