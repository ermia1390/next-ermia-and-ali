import { DefaultSession } from "next-auth"

//برای اینکه نیاز به اجرا نیست فقط قابل استفاده هست و توضیحات اضافه میکند
declare module "next-auth"{//برای اینکه نیاز به اجرا نیست فقط قابل استفاده هست و توضیحات اضافه میکند
    interface Session{
        user:{
            id:string
        }& DefaultSession["user"]
    }
    interface User{
        strapiToken:string
    }
}
declare module "@auth/core/jwt"{
    interface JWT{
        id:string
        strapiToken:string
    }
}
