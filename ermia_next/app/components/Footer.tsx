import Link from "next/link";

export default function Footer() {
return (
<footer dir="rtl" className="border-t border-zinc-800 bg-black px-5 py-10 text-white">
<div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
<div>
<h2 className="mb-3 text-xl font-black text-yellow-500">
[نام فروشگاه]
</h2>
<p className="leading-7 text-zinc-400">
فروشگاه تخصصی موبایل؛ برای بررسی و انتخاب گوشی مناسب.
</p>
</div>

    <div>
      <h3 className="mb-3 font-bold">دسترسی سریع</h3>
      <nav className="flex flex-col gap-3 text-zinc-400">
        <Link className="hover:text-yellow-500" href="/">صفحه اصلی</Link>
        <Link className="hover:text-yellow-500" href="/products">محصولات</Link>
        <Link className="hover:text-yellow-500" href="/about">درباره ما</Link>
        <Link className="hover:text-yellow-500" href="/contact">تماس با ما</Link>
      </nav>
    </div>

    <div>
      <h3 className="mb-3 font-bold">اطلاعات تماس</h3>
      <p className="mb-2 text-zinc-400">تلفن: [شماره تلفن]</p>
      <p className="text-zinc-400">ایمیل: [آدرس ایمیل]</p>
    </div>
  </div>

  <div className="mx-auto mt-8 max-w-6xl border-t border-zinc-800 pt-5 text-center text-sm text-zinc-500">
    © {new Date().getFullYear()} [نام فروشگاه]. تمامی حقوق محفوظ است.
  </div>
</footer>

);
}