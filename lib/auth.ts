import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const NEXT_AUTH: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({

            name: "Credentials",

            credentials: {
                username: { label: 'Enter your email', type: 'text', placeholder: 'abc@gmail.com' },
                password: { label: 'Enter password', type: 'password', placeholder: 'password123' },
            },
            async authorize(credentials: any) {

                console.log({ credentials })

                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Email and password are required");
                }


                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.username,
                    }
                })

                console.log(user)

                if (!user) {
                    throw new Error('user not found');
                }

                const checkPassword = await compare(credentials.password, user.password);

                if (!checkPassword) {
                    throw new Error('Invalid credentials');
                }

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email
                }

            },

        })
    ],
    callbacks: {

        jwt: async function ({ token, user }: any) {
            if (user) {
                token.id = user.id
            }
            return token
        },

        session: async function ({ session, token }: any) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        newUser: '/signup'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}