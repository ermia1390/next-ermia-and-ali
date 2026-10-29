import type { product } from "@/lib/products";
import Link from "next/link";

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
          Image Not Available
        </div>
      )}

      <h2 className="mb-2 text-xl font-bold text-yellow-500">
        {product.title}
      </h2>

      <p className="mb-4 leading-7 text-zinc-300">
        {product.description}
      </p>

      <p className="mb-4 text-lg font-bold text-white">
        {product.price} Toman
      </p>

      <Link
        href={`/products/${product.documentId}`}
        className="mb-4 block rounded-lg border border-zinc-700 px-4 py-3 text-center font-bold text-white transition hover:border-yellow-400 hover:text-yellow-400"
      >
        View Details
      </Link>
    </article>
  );
}