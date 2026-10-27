
import { auth } from "@/auth";
import { getproducts } from "@/lib/products";
import CartItems from "./CartItems";

export default async function CartPage() {
    const session = await auth();

    if (!session?.user?.strapiToken) {
        return (
            <main className="min-h-screen bg-zinc-950 p-8 text-white">
                <p>
                    Please sign in to view your shopping cart.
                </p>
            </main>
        );
    }

    const products = await getproducts(session.user.strapiToken);
    const strapiUrl = process.env.STRAPI_URL ?? "";

    return (
        <main className="min-h-screen bg-zinc-950 p-8 text-white">
            <CartItems
                products={products}
                strapiUrl={strapiUrl}
            />
        </main>
    );
}
