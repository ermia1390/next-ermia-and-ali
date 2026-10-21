import { product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

const STRAPI_URL = process.env.STRAPI_URL;

export default function ProductCard({
  product,
}: {
  product: product;
}) {
  const imageUrl = product.image?.url
    ? `${STRAPI_URL}${product.image.url}`
    : "";

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.image?.alternativeText || product.title}
          className="mb-4 h-48 w-full rounded-xl object-cover"
        />
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