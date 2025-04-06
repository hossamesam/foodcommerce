import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Awaitable, RequestInternal, User, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"



const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "•••••••••••"
                },
            },
            authorize: function (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Awaitable<User | null> {
                // throw new Error("Function not implemented.");
                const user = credentials
                return {
                    id: crypto.randomUUID(),
                    ...user
                }
            }
        }
        )
    ],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
    },
}

export default authOptions;