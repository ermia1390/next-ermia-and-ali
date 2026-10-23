import Link from "next/link";
import { auth } from "@/auth";
import { getproducts } from "@/lib/products";
import ProductList from "./ProductList";

export default async function ProductsPage() {
const session = await auth();

if (!session?.user?.strapiToken) {
return (
<main dir="rtl" className="min-h-screen bg-zinc-950 px-5 py-16 text-center text-white">
<h1 className="mb-4 text-3xl font-black text-yellow-500">
محصولات فروشگاه
</h1>
<p className="mb-6 text-zinc-300">
برای مشاهده محصولات ابتدا وارد حساب کاربری شو.
</p>
<Link
href="/login"
className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
>
ورود به حساب
</Link>
</main>
);
}

try {
const products = await getproducts(session.user.strapiToken);

return (
  <main dir="rtl" className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-3 text-3xl font-black text-yellow-500">
        محصولات فروشگاه
      </h1>
      <p className="mb-8 text-zinc-400">
        برند موردنظرت را انتخاب کن.
      </p>
      <ProductList products={products} />
    </div>
  </main>
);

} catch (error) {
console.error("Products page error:", error);

return (
  <main dir="rtl" className="min-h-screen bg-zinc-950 px-5 py-16 text-center text-white">
    <h1 className="mb-4 text-2xl font-bold text-yellow-500">
      دریافت محصولات ناموفق بود
    </h1>
    <p className="text-zinc-300">
      اتصال Strapi یا مجوز دسترسی محصولات را بررسی کن.
    </p>
  </main>
);

}
}