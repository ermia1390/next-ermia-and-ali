import Link from "next/link";

export default function ContactPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 font-bold text-yellow-500">
          Customer Support
        </p>

        <h1 className="mb-8 text-4xl font-black">
          Contact <span className="text-yellow-500">Us</span>
        </h1>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="mb-8 leading-8 text-zinc-300">
            If you have questions about our products or need to track an order,
            you can use the contact information below.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-bold text-yellow-500">Phone Number</h2>
              <p className="text-zinc-300">+1 202-555-0147</p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-yellow-500">Email</h2>
              <p className="text-zinc-300">hello@example.com</p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-yellow-500">Address</h2>
              <p className="text-zinc-300">123 Main Street, Example City</p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-yellow-500">Business Hours</h2>
              <p className="text-zinc-300">Monday–Friday, 9:00 AM–5:00 PM</p>
            </div>
          </div>
        </section>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          Back to Products
        </Link>
      </div>
    </main>
  );
}