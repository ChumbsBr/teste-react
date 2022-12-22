import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {}, 
            async authorize(credentials, req) {
                const res = await fetch(url + "/login", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            // If no error and we have user data, return it
            if (res.ok && user) {
                return user
            }
            // Return null if user data could not be retrieved
            return null
        }
     })
    ],
    callbacks:{
        async session(session, user){
            return session
        },
        async jwt(token, user){
            console.log('Jwt',{token}) 
        }
    }
}

export default NextAuth(authOptions);