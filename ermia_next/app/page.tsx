
import Link from "next/link";
import { getproducts, type product } from "@/lib/products";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  let products: product[] = [];

  try {
    products = await getproducts();
  } catch (error) {
    console.error("Failed to fetch products from Strapi:", error);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-zinc-800 px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-bold text-yellow-500">
            Your Mobile Store
          </p>

          <h1 className="mb-6 text-4xl font-black leading-relaxed sm:text-6xl">
            Find Your Perfect Phone
            <br />
            <span className="text-yellow-500">Right Here!</span>
          </h1>

          <p className="mb-8 max-w-xl leading-8 text-zinc-300">
            Explore the latest Samsung, Xiaomi, and Apple phones
            and find the right device for you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
            >
              Browse Products
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-yellow-500">
              Our Picks
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              Store Products
            </h2>
          </div>

          <Link
            href="/products"
            className="font-bold text-yellow-500 transition hover:text-yellow-300"
          >
            View All Products →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-300">
              No products are available right now.
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Please check the Strapi connection and product permissions.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black">
            Featured Brands
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "Samsung",
                description: "Explore Samsung phones",
              },
              {
                name: "Xiaomi",
                description: "Explore Xiaomi phones",
              },
              {
                name: "Apple",
                description: "Explore iPhones",
              },
            ].map((brand) => (
              <Link
                key={brand.name}
                href="/products"
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center transition hover:-translate-y-1 hover:border-yellow-500"
              >
                <h3 className="mb-2 text-xl font-bold text-yellow-500">
                  {brand.name}
                </h3>

                <p className="text-sm text-zinc-400">
                  {brand.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
