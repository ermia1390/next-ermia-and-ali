import Link from "next/link";
import { auth } from "@/auth";
import { getproducts } from "@/lib/products";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.strapiToken) {
    return (
      <main className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-yellow-500">
            محصولات فروشگاه
          </h1>

          <p className="mb-6 text-zinc-300">
            برای دیدن محصولات، اول وارد حساب کاربری خودت شو.
          </p>

          <Link
            href="/login"
            className="rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black hover:bg-yellow-400"
          >
            ورود به حساب
          </Link>
        </div>
      </main>
    );
  }

  const products = await getproducts(session.user.strapiToken);

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-yellow-500">
          محصولات فروشگاه
        </h1>

        {products.length === 0 ? (
          <p className="text-zinc-300">
            محصولی برای نمایش وجود ندارد.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}