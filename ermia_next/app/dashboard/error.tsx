"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({
    error,
    reset
}: {
    error: Error & {
        digest?: string
    }
    reset: () => void
}) {
    useEffect(() => {
        if (error.message === "strapi-token-expired") {
            signOut({
                callbackUrl: "/login",
            });
        }
    }, [error]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
                <h1 className="mb-3 text-3xl font-bold text-yellow-500">
                    Something Went Wrong
                </h1>

                <p className="mb-7 text-zinc-400">
                    We encountered a problem while loading the data.
                </p>

                <button 
                    className="rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-black transition hover:bg-yellow-500"
                    onClick={() => reset()}
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}