
"use client";

import type { product } from "@/lib/products";
import { usecreatecontext } from "@/context/CartContext";

export default function CartItems({
    products,
    strapiUrl,
}: {
    products: product[];
    strapiUrl: string;
}) {
    const {
        cartitem,
        handleincproduct,
        handledecproduct,
    } = usecreatecontext();

    const items = cartitem
        .map((cart) => ({
            product: products.find((item) => item.id === cart.id),
            qty: cart.qty,
        }))
        .filter((item) => item.product !== undefined);

    const totalQty = items.reduce(
        (total, item) => total + item.qty,
        0
    );

    const totalPrice = items.reduce(
        (total, item) =>
            total + (item.product?.price ?? 0) * item.qty,
        0
    );

    if (items.length === 0) {
        return (
            <div className="py-10 text-center">
                <h2 className="text-2xl font-bold text-yellow-500">
                    سبد خرید شما خالی است
                </h2>

                <p className="mt-3 text-zinc-400">
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-yellow-500">
                سبد خرید من
            </h1>

            <p className="mb-5 text-zinc-300">
                تعداد کل محصولات: {totalQty}
            </p>

            <div className="space-y-4">
                {items.map(({ product: cartProduct, qty }) => {
                    if (!cartProduct) return null;

                    const imageUrl = cartProduct.image?.url
                        ? `${strapiUrl}${cartProduct.image.url}`
                        : "";

                    return (
                        <article
                            key={cartProduct.id}
                            className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center"
                        >
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={
                                        cartProduct.image?.alternativeText ??
                                        cartProduct.title
                                    }
                                    className="h-24 w-full rounded-lg object-cover sm:w-28"
                                />
                            )}

                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-white">
                                    {cartProduct.title}
                                </h2>

                                <p className="mt-1 text-zinc-300">
                                    قیمت: {cartProduct.price} تومان
                                </p>

                                <p className="mt-1 text-zinc-400">
                                    جمع این محصول: {cartProduct.price * qty} تومان
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handledecproduct(cartProduct.id)
                                    }
                                    className="rounded-lg border border-zinc-700 px-3 py-2 hover:border-yellow-500"
                                >
                                    −
                                </button>

                                <span>{qty}</span>

                                <button


type="button"
                                    onClick={() =>
                                        handleincproduct(cartProduct.id)
                                    }
                                    className="rounded-lg border border-zinc-700 px-3 py-2 hover:border-yellow-500"
                                >
                                    +
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left">
                <p className="text-xl font-bold text-yellow-500">
                    مبلغ کل: {totalPrice} تومان
                </p>
            </div>
        </div>
    );
}