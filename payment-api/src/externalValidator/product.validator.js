import axios from "axios"

import debug from 'debug';
const DEBUG = debug('dev');

const productApiURL = process.env.PRODUCT_API_URL

export const fetchProduct = async (productId, token) => {
    try {
        const { data } = (await axios.get(`${productApiURL}products/${productId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })).data

        const product = data?.product

        if (product?.id === productId) {
            return product
        }
    } catch (error) {
        DEBUG(error);
        throw new Error('Product not found')
    }
}

export const patchProduct = async (productId, token, patchedData) => {
    try {
        const { data } = (await axios.patch(`${productApiURL}products/${productId}`, patchedData, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })).data

        const product = data?.product

        if (product?.id === productId) {
            return product
        }
    } catch (error) {
        DEBUG(error);
        throw new Error('Could not update product')
    }
}

export const validatePayment = (token) => async (productId, payed) => {
    const product = await fetchProduct(productId, token)

    if (product.value > Number(payed)) {
        throw new Error('The price is exceeding the ammount payed')
    }

    return product
}