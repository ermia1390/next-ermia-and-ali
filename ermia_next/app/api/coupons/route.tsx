
import { auth } from "@/auth";
import { strapifetch } from "@/lib/strapi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.strapiToken) {
            return NextResponse.json(
                { message: "Please sign in to use a coupon." },
                { status: 401 }
            );
        }

        const { code } = await request.json();

        if (!code || typeof code !== "string") {
            return NextResponse.json(
                { message: "Please enter a coupon code." },
                { status: 400 }
            );
        }

        const response = await strapifetch<{
            data: {
                id: number;
                attributes?: {
                    code: string;
                    discountPercent: number;
                    isActive: boolean;
                };
                code?: string;
                discountPercent?: number;
                isActive?: boolean;
            }[];
        }>(
            `/api/coupons?filters[code][$eq]=${encodeURIComponent(code.trim().toUpperCase())}`,
            session.user.strapiToken
        );

        const coupon = response.data[0];
        const details = coupon?.attributes ?? coupon;

        if (
            !coupon ||
            details.code !== code.trim().toUpperCase() ||
            details.isActive !== true ||
            typeof details.discountPercent !== "number" ||
            details.discountPercent <= 0 ||
            details.discountPercent > 100
        ) {
            return NextResponse.json(
                { message: "Invalid or expired coupon code." },
                { status: 400 }
            );
        }

        return NextResponse.json({
            code: details.code,
            discountPercent: details.discountPercent
        });
    } catch (error) {
        console.error("Coupon validation error:", error);

        return NextResponse.json(
            { message: "Unable to validate the coupon. Please try again." },
            { status: 500 }
        );
    }
}
