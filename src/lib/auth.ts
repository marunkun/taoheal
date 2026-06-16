import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GitHub OAuth
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // 演示用：访客登录（临时方案）
    Credentials({
      name: "Guest",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
      },
      async authorize(credentials) {
        if (!credentials?.name) return null;
        return {
          id: `guest-${Date.now()}`,
          name: credentials.name as string,
          email: `guest-${Date.now()}@daoheal.local`,
          image: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/zh/community",
    error: "/zh/community",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
