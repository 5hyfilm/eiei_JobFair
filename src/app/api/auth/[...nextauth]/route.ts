import NextAuth from "next-auth"
import { authOptions } from "./authOptions";
 

 

const handler = NextAuth(authOptions) //inital handler
export {handler as GET,handler as POST};