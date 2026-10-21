"use client"

import { usecreatecontext } from "@/context/CartContext"

export default function CartItems() {
    const { cartitem } = usecreatecontext()

    if (!cartitem || cartitem.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-yellow-500">
                    !سبد خرید شما خالی است
                </h2>
                <p className="mt-3 text-zinc-400">
                    .هنوز محصولي به سبد خريد اضافه نکرديد
                </p>
            </div>
        )
    }

    return (
        <div>
            <h2>سبد خرید من</h2>
            <p>
                تعداد کل محصولات: {
                    //نسبت به نهوه ایجاد دکمه متغير است
                }
            </p>
        </div>
    )
}
