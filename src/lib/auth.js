import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns/promises";


dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (!process.env.AUTH_DB_URI) {
  throw new Error("AUTH_DB_URI is not defined in your environment variables");
}
console.log(process.env.AUTH_DB_URI)
const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db();

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

   trustedOrigins: [
    "http://localhost:3000",
    "https://tiles-gallery-kappa.vercel.app"
  ],
   emailAndPassword: { 
    enabled: true, 
    autoSignIn: true,
  },
    database: mongodbAdapter(db, {
    client
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

});