
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, email, password } = body

        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return NextResponse.json(
                {
                    message: "Please enter valid registration information."
                },
                {
                    status: 400,
                },
            )
        }

        const response = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            },
        )

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        "Registration failed. Please check your information and try again."
                },
                {
                    status: response.status,
                },
            )
        }

        return NextResponse.json({
            message: "Your account has been created successfully!",
            user: data.user,
        })
    } catch {
        return NextResponse.json(
            {
                message: "We couldn't connect to the server. Please try again later."
            },
            {
                status: 500,
            },
        )
    }
}
