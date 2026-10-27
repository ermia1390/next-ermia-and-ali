const STRAPI_URL = process.env.STRAPI_URL;

if (!STRAPI_URL) {
    throw new Error("The server configuration is incomplete.");
}

export async function strapifetch<T>(
    path: string,
    token?: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${STRAPI_URL}${path}`, {
        ...options,
        headers,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("We couldn't complete your request. Please try again later.");
    }

    return (await response.json()) as T;
}