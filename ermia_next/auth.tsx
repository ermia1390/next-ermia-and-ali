import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {handlers , signIn , signOut , auth}=NextAuth({
    providers:[
        Credentials({
          credentials:{
            email:{
               label:"Email",
               type:"email",
            },
            password:{
                label:"Password",
                type:"password",
            },
          },
          async authorize (credentials){
            if (
           typeof credentials?.email !== "string" ||
           typeof credentials?.password !== "string"
            ){
             return null
            }
            const response=await fetch(`${process.env.STRAPI_URL}/api/auth/local`,
                { 
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            }, 
            body:JSON.stringify({
             identifier:credentials.email,
             password:credentials.password,
            }),  
           },
        )
        if(!response.ok){
            return null
        }
        const data=await response.json()
        return{
            id:String(data.user.id),
            name:data.user.username,
            email:data.user.email,
            strapiToken:data.jwt
          }
       },
    })
 ],
 callbacks:{
    async jwt({token,user}){
        console.log("BEFORE JWT:" ,token)
        console.log("USER:",user)
        if(user){
            token.id=user.id!
            token.strapiToken=user.strapiToken
        }
        console.log("AFTER JWT:",token)
        return token     
    },
    async session({session,token}){
        console.log("session")
        console.log("session before:",session)
        console.log("token:",token)
        
        session.user.id=token.id as string
        session.user.strapiToken=token.strapiToken as string 

        console.log("after session:", session)
        return session
    }
 }
})





//ما برای اولین بار زمانی که لاگین میشیم برای یکبار اطلاعات را استراپی پر میکند و میفرست,د    //اگر یوزر از قبل بوده باشه اگر ما تعریفی نکنیم برای ما یا null میزنه یا undefind     //برای عمین ما آیدی را برابر با استراپی توکن میکتیم