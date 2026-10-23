import Link from "next/link";

export default function AboutPage() {
return (
<main dir="rtl" className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
<div className="mx-auto max-w-4xl">
<p className="mb-3 font-bold text-yellow-500">درباره فروشگاه</p>

    <h1 className="mb-8 text-4xl font-black">
      درباره <span className="text-yellow-500">ما</span>
    </h1>

    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 leading-9 text-zinc-300">
      <h2 className="mb-4 text-xl font-bold text-white">
        داستان فروشگاه ما
      </h2>

      <p>
        [نام فروشگاه] با هدف ارائه گوشی‌های موبایل و کمک به انتخاب بهتر
        مشتریان راه‌اندازی شده است.
      </p>

      <p className="mt-4">
        در این فروشگاه می‌توانی محصولات برندهای سامسونگ، شیائومی و آیفون
        را بررسی کنی.
      </p>

      <p className="mt-4">
        [متن معرفی، سابقه و اطلاعات بیشتر درباره فروشگاه را اینجا بنویس.]
      </p>
    </section>

    <Link
      href="/products"
      className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
    >
      مشاهده محصولات
    </Link>
  </div>
</main>

);
}