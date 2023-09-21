import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "J Smith",
          email: "user@example.com",
          password: "1Password",
        };
        if (
          user.email === credentials.email &&
          user.password === credentials.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
