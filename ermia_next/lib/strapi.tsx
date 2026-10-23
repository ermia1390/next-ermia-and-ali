const STRAPI_URL = process.env.STRAPI_URL;

if (!STRAPI_URL) {
throw new Error("STRAPI_URL در فایل .env تعریف نشده است.");
}

export async function strapifetch<T>(
path: string,
token?: string,
options: RequestInit = {}
): Promise<T> {
const headers = new Headers(options.headers);

headers.set("Content-Type", "application/json");

if (token) {
headers.set("Authorization", "Bearer ${token}");
}

const response = await fetch(`${STRAPI_URL}${path}`, {
...options,
headers,
cache: "no-store",
});

if (!response.ok) {
const details = await response.text();

throw new Error(
 `  Strapi request failed: ${response.status} ${response.statusText}. ${details}`
);

}

return (await response.json()) as T;
}