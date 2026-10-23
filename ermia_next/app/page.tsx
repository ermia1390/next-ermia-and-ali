
import Link from "next/link";
import { auth } from "@/auth";
import { getproducts , type product} from "@/lib/products";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await auth();

  let products: product[] = [];

  if (session?.user?.strapiToken) {
    try {
      products = await getproducts(session.user.strapiToken);
    } catch (error) {
      console.error("خطا در دریافت محصولات از Strapi:", error);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-zinc-950 text-white"
    >

      <section className="border-b border-zinc-800  from-zinc-900 via-zinc-950 to-black px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-bold text-yellow-500">
            فروشگاه تخصصی موبایل
          </p>

          <h1 className="mb-6 text-4xl font-black leading-relaxed sm:text-6xl">
            گوشی مورد علاقه‌ات
            <br />
            <span className="text-yellow-500">
              اینجاست!
            </span>
          </h1>

          <p className="mb-8 max-w-xl leading-8 text-zinc-300">
            جدیدترین گوشی‌های سامسونگ، شیائومی و آیفون را
            در فروشگاه ما بررسی کن و گوشی مناسب خودت را پیدا کن.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
            >
              مشاهده محصولات
            </Link>

            {!session?.user?.strapiToken && (
              <Link
                href="/login"
                className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-400"
              >
                ورود به حساب
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* بخش محصولات */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-yellow-500">
              انتخاب‌های شما
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              محصولات فروشگاه
            </h2>
          </div>

          <Link
            href="/products"
            className="font-bold text-yellow-500 transition hover:text-yellow-300"
          >
            مشاهده همه محصولات ←
          </Link>
        </div>

        {!session?.user?.strapiToken ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h3 className="mb-3 text-xl font-bold">
              برای مشاهده محصولات وارد حساب شو
            </h3>

            <p className="mb-6 text-zinc-400">
              پس از ورود، محصولات ثبت‌شده در فروشگاه نمایش داده می‌شوند.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black hover:bg-yellow-400"
            >
              ورود به حساب
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-300">
              فعلاً محصولی برای نمایش دریافت نشد.
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              اتصال Strapi و وجود محصولات را بررسی کن.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black">
            برندهای فروشگاه
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "سامسونگ",
                description: "گوشی‌های Samsung",
              },
              {
                name: "شیائومی",
                description: "گوشی‌های Xiaomi",
              },
              {
                name: "آیفون",
                description: "گوشی‌های Apple",
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