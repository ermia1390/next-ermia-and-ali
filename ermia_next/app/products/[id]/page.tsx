import Link from "next/link";
import { getproductbyid, getproducts } from "@/lib/products";
import AddToCartButton from "@/app/components/AddToCartButton";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  let products: Awaited<ReturnType<typeof getproducts>> = [];

  try {
    product = await getproductbyid(id);
    products = await getproducts();
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
    ?`${STRAPI_URL}${product.image.url}`
    : null;

  const relatedProducts = products.filter(
    (item) =>
      item.id !== product.id &&
      item.brand &&
      product.brand &&
      item.brand === product.brand
  );

  return (
    <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:grid-cols-2 sm:p-10">
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

        <section className="mt-12">
          <h2 className="mb-6 border-b border-zinc-800 pb-4 text-2xl font-black text-yellow-500">
            More Products From {product.brand || "This Brand"}
          </h2>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.documentId}`}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-yellow-500"
                >
                  {item.image?.url ? (
                    <img
                      src={`${STRAPI_URL}${item.image.url}`}
                      alt={item.image.alternativeText || item.title}
                      className="mb-4 h-44 w-full rounded-xl object-contain"
                    />
                  ) : (
                    <div className="mb-4 flex h-44 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                      Image Not Available
                    </div>
                  )}

                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="font-bold text-yellow-500">
                    {item.price} Toman
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
              No other products from this brand were found.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}