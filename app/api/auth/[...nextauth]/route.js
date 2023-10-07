import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import { compare } from "bcrypt";
import User from "@/models/user";
import UserData from "@/models/userData";

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                await connectToDB();

                const result = await User.findOne({ email: credentials.email })

                if (!result) {
                    throw new Error("No user Found with Email")
                }

                const checkPassword = await compare(credentials.password, result.password)

                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match ")
                }
                result.name = credentials?.name ? credentials?.name : result?.name;
                await result.save()
                return result;
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await UserData.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },

        async signIn({ user }) {
            const { email, name, image } = user;

            try {
                const res = await fetch('http://localhost:3000/api/users', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        username: name,
                        image: image
                    })
                })

                if (res.ok) {
                    return user;
                }
            } catch (error) {
                console.log(error);
            }

        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    }
})

export { handler as GET, handler as POST };