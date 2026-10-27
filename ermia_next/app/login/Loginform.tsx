"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function loginform() {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(false);

    async function handlesubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        seterror("");
        setloading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        setloading(false);

        if (!result || result.error) {
            seterror("Your email or password is incorrect.");
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <form onSubmit={handlesubmit} className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <h1 className="mb-8 text-center text-3xl font-bold text-yellow-500">
                Login
            </h1>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setpassword(event.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                />
            </div>

            {error && (
                <p className="mb-5 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-yellow-600 px-5 py-3 font-bold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}