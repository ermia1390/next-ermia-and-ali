
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-3xl font-bold">
            Welcome, {session.user.name || "User"}!
          </h1>

          <div className="mt-5 space-y-2 text-zinc-300">
            <p>
              <span className="font-semibold text-white">Username:</span>{" "}
              {session.user.name || "Not available"}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {session.user.email || "Not available"}
            </p>
          </div>
        </section>
        <br />

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">Your Shopping Cart</h2>
          <p className="mt-2 text-zinc-400">
            Check the products you have added to your cart.
          </p>

          <Link
            href="/cart"
            className="mt-5 inline-block rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            View Cart
          </Link>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold">Featured Brands</h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link
              href="/products?brand=Samsung"
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:border-yellow-500"
            >
              <h3 className="text-xl font-bold">Samsung</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Explore Samsung products
              </p>
            </Link>

            <Link
              href="/products?brand=Xiaomi"
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:border-yellow-500"
            >
              <h3 className="text-xl font-bold">Xiaomi</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Explore Xiaomi products
              </p>
            </Link>

            <Link
              href="/products?brand=Apple"
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:border-yellow-500"
            >
              <h3 className="text-xl font-bold">Apple</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Explore Apple products
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
