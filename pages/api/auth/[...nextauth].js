import NextAuth from "next-auth";
// import Providers from 'next-auth/providers'
// import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "../../../helpers/db/crypt";
import { connectToDb } from "../../../helpers/db/dbcon";

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDb();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("user not found");
        }

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("wrong password");
        }
        client.close();
        return {
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const client = await connectToDb();

//         const usersCollection = client.db().collection("users");

//         const user = await usersCollection.findOne({
//           email: credentials.email,
//         });

//         if (!user) {
//           client.close();
//           throw new Error("no user found");
//         }

//         const isValid = await comparePassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           client.close();
//           throw new Error("coild not log in");
//         }
//         client.close();
//         return {
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
// });
