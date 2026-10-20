import { NextResponse } from "next/server"

export async function POST(request:Request) {
    try{
        const body=await request.json()
        const {username,email,password}=body
        if(
            typeof username !== "string" ||
            typeof email    !== "string" ||
            typeof password !== "string" 
        ){
            return NextResponse.json({
             message:"etelat vared shode motabar nist"
            },
            {
                status:400,
            },
        )
        }
        const response=await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    username,
                    email,
                    password,
                }),
            },
        )
        const data=await response.json()
        if(!response.ok){
            return NextResponse.json({
                message:
                data?.error?.message || "sabt nam anjam nashod"
            },
            {
                status:response.status,
            },
        )
        }
        return NextResponse.json({
            message: "sabt nam anjam shod",
            user: data.user,
        })
    }catch{
        return NextResponse.json(
            {
                message: "khata dar ertebat ba server"
            },
            {
                status: 500,
            },
        )
    }
}