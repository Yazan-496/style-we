'use server';

import {cookies} from 'next/headers';
import axios from "axios";
import API2 from 'helpers/API/API2';

export async function LoadMoreFeaturedProducts(page) {
    const perPage = 12;
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL_LIVE}api/web_v10/web/home/feature-product?offset=${page}&limit=${perPage}`;
    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data.data.featured_products || [];
    } catch (error) {
        return [];
    }
}

export async function FetchCart() {
    const Cookie = cookies();
    const local = await Cookie.get('lang')?.value && await Cookie.get('lang')?.value
    const token = await Cookie.get('TOKEN_LOCAL_STORAGE')?.value && await JSON.parse(Cookie.get('TOKEN_LOCAL_STORAGE')?.value)?.token;
    try {
        const shippingApiCall = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL_LIVE + 'api/web_v10/cart/cart_shipping',
            {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${token}`,
                    lang: local
                }
            }
        );
        const shippingResponse = await shippingApiCall.json();
        return { shippingCart: shippingResponse?.data || [] };
    } catch (e){
        return { shippingCart: [] };
    }

}
export async function AddToCartServer(id, quantity, choice_1, is_redeem) {
    const Cookie = cookies();
    const local = await Cookie.get('lang')?.value && await Cookie.get('lang')?.value
    const token = await Cookie.get('TOKEN_LOCAL_STORAGE')?.value && await JSON.parse(Cookie.get('TOKEN_LOCAL_STORAGE')?.value)?.token;
    try {
        const addToCartApiCall = await API2.post(
            process.env.NEXT_PUBLIC_BASE_URL_LIVE + `api/web_v10/cart/add`, {
                id,
                quantity,
                choice_1,
                is_redeem
            },
            {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${token}`,
                    lang: local
                }
            }
        );
        return {data: addToCartApiCall.data, type: 'success'};
    } catch (e){
        return {data: [], type: 'error', error: e, token, local };
    }

}
export async function DeleteFromCartServer(id) {
    const Cookie = cookies();
    const local = await Cookie.get('lang')?.value && await Cookie.get('lang')?.value
    const token = await Cookie.get('TOKEN_LOCAL_STORAGE')?.value && await JSON.parse(Cookie.get('TOKEN_LOCAL_STORAGE')?.value)?.token;
    try {
        const RemoveFromCartApiCall = await API2.post(
            process.env.NEXT_PUBLIC_BASE_URL_LIVE + `api/web_v10/cart/remove`, {
                key: id
            },
            {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${token}`,
                    lang: local
                }
            }
        );
        return {data: RemoveFromCartApiCall.data, type: 'success'};
    } catch (e){
        return {data: [], type: 'error', error: e};
    }

}
export async function ChangeQuantityServer(id, quantity) {
    const Cookie = cookies();
    const local = await Cookie.get('lang')?.value && await Cookie.get('lang')?.value
    const token = await Cookie.get('TOKEN_LOCAL_STORAGE')?.value && await JSON.parse(Cookie.get('TOKEN_LOCAL_STORAGE')?.value)?.token;
    try {
        const ChangeQuantityApiCall = await API2.post(
            process.env.NEXT_PUBLIC_BASE_URL_LIVE + `api/web_v10/cart/update`, {
                key: id,
                quantity
            },
            {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${token}`,
                    lang: local
                }
            }
        );
        return {data: ChangeQuantityApiCall.data, type: 'success'};
    } catch (e){
        return {data: [], type: 'error', error: e};
    }

}