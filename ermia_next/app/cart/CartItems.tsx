
"use client";

import { useState } from "react";
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

    const [coupon, setCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [couponMessage, setCouponMessage] = useState("");
    const [couponError, setCouponError] = useState(false);
    const [loadingCoupon, setLoadingCoupon] = useState(false);

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

    const discountAmount = Math.round(
        totalPrice * discountPercent / 100
    );

    const finalPrice = totalPrice - discountAmount;

    async function applyCoupon() {
        if (!coupon.trim()) {
            setAppliedCoupon("");
            setDiscountPercent(0);
            setCouponError(true);
            setCouponMessage("Please enter a coupon code.");
            return;
        }

        setLoadingCoupon(true);
        setCouponMessage("");

        try {
            const response = await fetch("/api/coupons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: coupon.trim().toUpperCase(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setAppliedCoupon("");
                setDiscountPercent(0);
                setCouponError(true);
                setCouponMessage(
                    data.message || "Invalid or expired coupon code."
                );
                return;
            }

            setAppliedCoupon(data.code);
            setDiscountPercent(data.discountPercent);
            setCouponError(false);
            setCouponMessage("Coupon applied successfully!");
        } catch {
            setAppliedCoupon("");
            setDiscountPercent(0);
            setCouponError(true);
            setCouponMessage(
                "Unable to validate the coupon. Please try again."
            );
        } finally {
            setLoadingCoupon(false);
        }
    }

    if (items.length === 0) {
        return (
            <div className="py-10 text-center">
                <h2 className="text-2xl font-bold text-yellow-500">
                    Your Cart Is Empty
                </h2>

                <p className="mt-3 text-zinc-400">
                    You haven't added any products to your cart yet.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-yellow-500">
                My Shopping Cart
            </h1>

            <p className="mb-5 text-zinc-300">
                Total Items: {totalQty}
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
                                    Price: {cartProduct.price.toLocaleString()} Toman
                                </p>

                                <p className="mt-1 text-zinc-400">
                                    Item Total: {(cartProduct.price * qty).toLocaleString()} Toman
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

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h2 className="mb-3 text-lg font-bold text-white">
                    Coupon Code
                </h2>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />

                    <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={loadingCoupon}
                        className="rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingCoupon ? "Checking..." : "Apply Coupon"}
                    </button>
                </div>

                {couponMessage && (
                    <p
                        className={`mt-3 text-sm ${
                            couponError ? "text-red-400" : "text-green-400"
                        }`}
                    >
                        {couponMessage}
                    </p>
                )}
            </div>

            <div className="mt-6 space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left">
                <p className="text-zinc-300">
                    Subtotal: {totalPrice.toLocaleString()} Toman
                </p>

                <p className="text-green-400">
                    Discount {appliedCoupon ? `(${appliedCoupon} - ${discountPercent}%)` : ""}: -
                    {discountAmount.toLocaleString()} Toman
                </p>

                <p className="border-t border-zinc-700 pt-3 text-xl font-bold text-yellow-500">
                    Total Price: {finalPrice.toLocaleString()} Toman
                </p>
            </div>
        </div>
    );
}
