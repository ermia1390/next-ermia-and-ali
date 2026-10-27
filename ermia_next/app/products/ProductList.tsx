"use client";

import { useState } from "react";
import type { product } from "@/lib/products";
import ProductCard from "../components/ProductCard";

type BrandFilter = "all" | "xiaomi" | "samsung" | "iphone";

function getBrand(item: product): BrandFilter | "other" {
  const brand = (item.brand ?? "").toLowerCase();
  const title = (item.title ?? "").toLowerCase();
  const value = `${brand} ${title}`;

  if (
    value.includes("xiaomi") ||
    value.includes("شیائومی") ||
    value.includes("شیاومی") ||
    value.includes("redmi") ||
    value.includes("poco")
  ) {
    return "xiaomi";
  }

  if (
    value.includes("samsung") ||
    value.includes("سامسونگ") ||
    value.includes("galaxy")
  ) {
    return "samsung";
  }

  if (
    value.includes("iphone") ||
    value.includes("آیفون") ||
    value.includes("ایفون") ||
    value.includes("apple") ||
    value.includes("اپل")
  ) {
    return "iphone";
  }

  return "other";
}

export default function ProductList({
  products,
}: {
  products: product[];
}) {
  const [selectedBrand, setSelectedBrand] =
    useState<BrandFilter>("all");

  const filters: { label: string; value: BrandFilter }[] = [
    { label: "همه محصولات", value: "all" },
    { label: "شیائومی", value: "xiaomi" },
    { label: "سامسونگ", value: "samsung" },
    { label: "آیفون", value: "iphone" },
  ];

  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter(
          (item) => getBrand(item) === selectedBrand
        );

  return (
    <section>
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setSelectedBrand(filter.value)}
            className={`
rounded-xl border px-5 py-3 font-bold transition ${
              selectedBrand === filter.value
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-zinc-700 bg-zinc-900 text-white hover:border-yellow-400"
            } `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-300">
          محصولی برای این برند پیدا نشد.
          <p className="mt-2 text-sm text-zinc-500">
            نام برند را در عنوان یا فیلد brand محصول در Strapi وارد کن.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.documentId || item.id}
              product={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}