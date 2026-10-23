import { strapifetch } from "./strapi";

export type product = {
id: number;
documentId: string;
title: string;
price: number;
description: string;
brand?: string;
isPopular?: boolean;
image?: {
id: number;
documentId: string;
url: string;
alternativeText?: string | null;
};
};

type productresponse = {
data: product[];
};

export async function getproducts(token: string) {
const response = await strapifetch<productresponse>(
"/api/products?populate=image",
token
);

return response.data;
}