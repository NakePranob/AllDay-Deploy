import NextAuth from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

declare module "next-auth" {
    interface Session {
      user: Users | null | undefined;
    }

    interface User {
        id:     any | null
        email:  string 
        name:   string  | null | undefined
        image:  any | null
        roleId: any | null 
    }

    interface JWT {
        id:     any | null
        email:  string 
        name: string  | null | undefined
        image: string  | null
        roleId: string 
    }
}

interface Users {
    id:     any | null
    email:  string 
    name:   string  | null | undefined
    image:  any | null
    roleId: any | null
}

const handler = NextAuth({
    providers: [
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email.address@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (user && 
                    (await bcrypt.compare(credentials.password, user.password?.toString() || ''))
                ) {
                    return {
                        id: `${user.id}`,
                        email: user.email,
                        name: user.firstname+' '+user.lastname,
                        image: user.profile,
                        roleId: user.roleId.toString()
                    }
                } else {
                    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.image = user.image;
                token.roleId = user.roleId;
            }
            return token;
        },

        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.image = token.image;
                session.user.roleId = token.roleId;
            }
            return session;
        },
    },
})

export { handler as GET, handler as POST }