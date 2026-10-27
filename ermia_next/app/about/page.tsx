
import Link from "next/link";

export default function AboutPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 font-bold text-yellow-500">
          About Our Store
        </p>

        <h1 className="mb-8 text-4xl font-black">
          About <span className="text-yellow-500">Us</span>
        </h1>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 leading-9 text-zinc-300">
          <h2 className="mb-4 text-xl font-bold text-white">
            Our Story
          </h2>

          <p>
            MobileHub was created to offer mobile phones and help customers
            make better purchasing decisions.
          </p>

          <p className="mt-4">
            At our store, you can explore products from brands such as
            Samsung, Xiaomi, and Apple.
          </p>

          <p className="mt-4">
            Our goal is to make it easier for customers to discover and
            compare phones that suit their needs.
          </p>
        </section>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
