import { auth } from "@/auth";
import { getproducts } from "@/lib/products";

export default async function dashbourd() {
    const session=await auth()
    const products=await getproducts(
        session!.user.strapiToken
    )
    return(
         <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 shadow-xl">
                    <h2 className="mb-2 text-3xl font-bold text-yellow-500">panel karbari</h2>
                        <p className="text-zinc-400">khosh amadi {session?.user?.name}</p>

                </div>
            </div>
            <section className="">
                <h2 className="mb-5 text-2xl font-bold text-white">mahsolat</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product)=>(
                        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-600/50 hover:shadow-yellow-900/10" key={product.id}>
                            {product.image && (
                                <img
                                    src={`${process.env.STRAPI_URL}${product.image.url}`}
                                    alt={product.image.alternativeText || product.title}
                                    className="mb-5 h-48 w-full rounded-xl object-cover"
                                />
                            )}
                            <h3 className="mb-3 text-xl font-bold text-yellow-500">{product.title}</h3>
                            <p className="mb-5 leading-7 text-zinc-400">{product.description}</p>
                            <p className="text-lg font-bold text-white">toman{product.price}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}