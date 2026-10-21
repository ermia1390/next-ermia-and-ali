"use client";

import { usecreatecontext } from "@/context/CartContext";

export default function AddToCartButton({
  productId,
}: {
  productId: number;
}) {
  const { handleincproduct, getproductqty } = usecreatecontext();

  const qty = getproductqty(productId);

  return (
    <button
      type="button"
      onClick={() => handleincproduct(productId)}
      className="w-full rounded-lg bg-yellow-500 px-4 py-3 font-bold text-black transition hover:bg-yellow-400"
    >
      {qty > 0
        ?`  dobare afzodan  (tedad dar sabad kharid: ${qty})`
        : "افزودن به سبد خرید"}
    </button>
  );
}