export default function loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-10 py-8 text-center shadow-2xl">
                <h1 className="mb-3 text-3xl font-bold text-yellow-500">
                    User Dashboard
                </h1>

                <p className="text-zinc-400">
                    Loading data...
                </p>
            </div>
        </main>
    );
}