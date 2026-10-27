import Link from "next/link";
import { getproductbyid } from "@/lib/products";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;

  try {
    product = await getproductbyid(id);
  } catch {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-5 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold text-yellow-500">
          Unable to Load Product
        </h1>

        <p className="mb-6 text-zinc-400">
          We couldn't load this product right now. Please try again later.
        </p>

        <Link
          href="/products"
          className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const imageUrl = product.image?.url
    ? `${process.env.STRAPI_URL || "http://localhost:1337"}${product.image.url}`
    : null;

  return (
    <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
      <div className="mx-auto grid max-w-5xl gap-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:grid-cols-2 sm:p-10">
        <div className="flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.image?.alternativeText || product.title}
              className="max-h-96 w-full rounded-xl object-contain"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
              Image Not Available
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-5 text-3xl font-black text-yellow-500">
            {product.title}
          </h1>

          <p className="mb-6 leading-8 text-zinc-300">
            {product.description}
          </p>

          <p className="mb-6 text-2xl font-bold">
            {product.price} Toman
          </p>

          <AddToCartButton productId={product.id} />

          <Link
            href="/products"
            className="mt-4 block text-center text-zinc-400 transition hover:text-yellow-400"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}