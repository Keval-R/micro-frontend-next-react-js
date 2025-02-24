import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
        }),
    }),
});

export const { useGetProductsQuery } = productApi;
