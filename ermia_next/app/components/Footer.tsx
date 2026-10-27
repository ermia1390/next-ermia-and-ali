
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-5 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 text-xl font-black text-yellow-500">
            MobileHub
          </h2>
          <p className="leading-7 text-zinc-400">
            Your trusted mobile store. Explore and find the right phone for you.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Quick Links</h3>
          <nav className="flex flex-col gap-3 text-zinc-400">
            <Link className="hover:text-yellow-500" href="/">Home</Link>
            <Link className="hover:text-yellow-500" href="/products">Products</Link>
            <Link className="hover:text-yellow-500" href="/about">About Us</Link>
            <Link className="hover:text-yellow-500" href="/contact">Contact Us</Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Contact Information</h3>
          <p className="mb-2 text-zinc-400">
            Phone: +989876543210
          </p>
          <p className="text-zinc-400">
            Email: hello@example.com
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-zinc-800 pt-5 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} MobileHub. All rights reserved.
      </div>
    </footer>
  );
}
