
"use client";

import { usecreatecontext } from "@/context/CartContext";

export default function AddToCartButton({
    productId,
}: {
    productId: number;
}) {
    const { handleincproduct } = usecreatecontext();

    return (
        <button
            onClick={() => handleincproduct(productId)}
            className="mt-3 w-full rounded-lg bg-yellow-500 p-2 font-bold text-black transition hover:bg-yellow-400"
        >
            Add to Cart
        </button>
    );
}
