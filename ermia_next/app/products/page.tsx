
import { getproducts } from "@/lib/products";
import ProductList from "./ProductList";

export default async function ProductsPage() {
  try {
    const products = await getproducts();

    return (
      <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-3xl font-black text-yellow-500">
            Store Products
          </h1>
          <p className="mb-8 text-zinc-400">
            Choose your preferred brand.
          </p>
          <ProductList products={products} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Products page error:", error);

    return (
      <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-16 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold text-yellow-500">
          Failed to Load Products
        </h1>
        <p className="text-zinc-300">
          Please check your connection and reload the page.
        </p>
      </main>
    );
  }
}
