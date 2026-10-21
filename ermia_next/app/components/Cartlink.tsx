"use client"

import Link from "next/link"
import { usecreatecontext } from "@/context/CartContext"

export default function CartLink(){
    const {gettotalproductqty}=usecreatecontext()

    return(
        <Link
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-yellow-500 hover:text-yellow-400"
            href="/cart"
        >
           سبد خرید ({gettotalproductqty ?? 0})
        </Link>
    )
}