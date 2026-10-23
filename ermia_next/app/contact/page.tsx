import Link from "next/link";

export default function ContactPage() {
return (
<main dir="rtl" className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
<div className="mx-auto max-w-4xl">
<p className="mb-3 font-bold text-yellow-500">پشتیبانی مشتریان</p>

    <h1 className="mb-8 text-4xl font-black">
      تماس با <span className="text-yellow-500">ما</span>
    </h1>

    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="mb-8 leading-8 text-zinc-300">
        برای پرسیدن سؤال درباره محصولات یا پیگیری سفارش‌ها می‌توانی از
        اطلاعات زیر استفاده کنی.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="mb-2 font-bold text-yellow-500">شماره تماس</h2>
          <p className="text-zinc-300">[شماره تلفن فروشگاه]</p>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-yellow-500">ایمیل</h2>
          <p className="text-zinc-300">[آدرس ایمیل فروشگاه]</p>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-yellow-500">آدرس</h2>
          <p className="text-zinc-300">[آدرس فروشگاه]</p>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-yellow-500">ساعات پاسخ‌گویی</h2>
          <p className="text-zinc-300">[روزها و ساعات کاری]</p>
        </div>
      </div>
    </section>

    <Link
      href="/products"
      className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
    >
      بازگشت به محصولات
    </Link>
  </div>
</main>

);
}