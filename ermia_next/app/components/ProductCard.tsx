import type { product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

const STRAPI_URL = process.env.STRAPI_URL;

export default function ProductCard({
  product,
}: {
  product: product;
}) {
  const imageUrl = product.image?.url
    ? `${STRAPI_URL || "http://localhost:1337"}${product.image.url}`
    : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.image?.alternativeText || product.title}
          className="mb-4 h-48 w-full rounded-xl object-contain"
        />
      ) : (
        <div className="mb-4 flex h-48 w-full items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
          تصویر موجود نیست
        </div>
      )}

      <h2 className="mb-2 text-xl font-bold text-yellow-500">
        {product.title}
      </h2>

      <p className="mb-4 leading-7 text-zinc-300">
        {product.description}
      </p>

      <p className="mb-4 text-lg font-bold text-white">
        {product.price} تومان
      </p>

      <AddToCartButton productId={product.id} />
    </article>
  );
}