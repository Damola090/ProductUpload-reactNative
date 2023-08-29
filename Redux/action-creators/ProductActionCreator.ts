import { Dispatch } from 'redux';
import { ProductActionType } from '../action-types/productActionType';
import { ProductAction } from '../actions/productAction';


const localIpAddress: String = '192.168.8.127';
const development: String = `http://${localIpAddress}:4000`
const production: String = `https://calm-plum-termite-hat.cyclic.app`

export const fetchAllProducts = (keyword = '') => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.ALL_PRODUCTS_REQUEST
            })


            let link = `${production}/api/v1/get-all-products`

            const response = await fetch(link, {
                method: 'GET',
                headers: {
                    "Content-Type": "Application/json",
                }
            })

            const data = await response.json()

            if (response.status === 200) {

                return dispatch({
                    type: ProductActionType.ALL_PRODUCTS_SUCCESS,
                    payload: data.products
                })
            }

            if (response.status === 400) {
                return dispatch({
                    type: ProductActionType.ALL_PRODUCTS_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {
            dispatch({
                type: ProductActionType.ALL_PRODUCTS_FAIL,
                payload: "Failed to Fetch all Products"
            })
        }
    }
}

export const fetchSingleProduct = (id: String) => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.PRODUCT_DETAILS_REQUEST
            })


            const response = await fetch(`${production}/api/v1/get-single-product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                }
            })

            const data = await response.json()

            if (response.status === 200) {
                return dispatch({
                    type: ProductActionType.PRODUCT_DETAILS_SUCCESS,
                    payload: data.product
                })
            }

            if (response.status === 404) {
                return dispatch({
                    type: ProductActionType.PRODUCT_DETAILS_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {

            dispatch({
                type: ProductActionType.PRODUCT_DETAILS_FAIL,
                payload: "Failed to Fetch single Products"
            })
        }
    }
}

export const uploadPicture = (image: any) => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.UPLOAD_PICTURE_REQUEST
            })


            const response = await fetch(`${production}/api/v1/admin/product/image`, {
                method: 'POST',
                headers: {
                    Accept: 'Application/json',
                    'Content-Type': 'multiPart/form-data'
                },
                body: image
            })

            const data = await response.json()

            if (response.status === 200) {
                return dispatch({
                    type: ProductActionType.UPLOAD_PICTURE_SUCCESS,
                    payload: data.data
                })
            }

            if (response.status === 400) {
                return dispatch({
                    type: ProductActionType.UPLOAD_PICTURE_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {

            dispatch({
                type: ProductActionType.UPLOAD_PICTURE_FAIL,
                payload: "Something went wrong"
            })

        }
    }
}

export const createProduct = (productData: object) => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.NEW_PRODUCT_REQUEST
            })

            const response = await fetch(`${production}/api/v1/admin/create-new-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(productData)
            })

            const data = await response.json();

            if (response.status === 201) {

                return dispatch({
                    type: ProductActionType.NEW_PRODUCT_SUCCESS,
                    payload: data
                })
            }

            if (response.status === 400) {
                return dispatch({
                    type: ProductActionType.NEW_PRODUCT_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {

            dispatch({
                type: ProductActionType.NEW_PRODUCT_FAIL,
                payload: "Something went wrong"
            })
        }
    }
}


export const deleteProduct = (id: String) => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.DELETE_PRODUCT_REQUEST
            })

            const response = await fetch(`${production}/api/v1/admin/get-single-product/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "Application/json",
                },
            })

            const data = await response.json()

            if (response.status === 200) {
                return dispatch({
                    type: ProductActionType.DELETE_PRODUCT_SUCCESS,
                    payload: data.message
                })
            }

            if (response.status === 400) {
                dispatch({
                    type: ProductActionType.DELETE_PRODUCT_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {

            dispatch({
                type: ProductActionType.DELETE_PRODUCT_FAIL,
                payload: "Something went Wrong"
            })
        }
    }
}


export const updateProduct = (id: string, product: object) => {
    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            dispatch({
                type: ProductActionType.UPDATE_PRODUCT_REQUEST
            })

            const response = await fetch(`${production}/api/v1/admin/get-single-product/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(product)
            })

            const data = await response.json()

            if (response.status === 200) {
                return dispatch({
                    type: ProductActionType.UPDATE_PRODUCT_SUCCESS,
                    payload: data
                })
            }

            if (response.status === 400) {
                dispatch({
                    type: ProductActionType.UPDATE_PRODUCT_FAIL,
                    payload: data.message
                })
            }

        } catch (err) {

            dispatch({
                type: ProductActionType.UPDATE_PRODUCT_FAIL,
                payload: "Something went Wrong"
            })
        }
    }
}

export const clearErrors = () => {
    return async (dispatch: Dispatch<ProductAction>) => {
        dispatch({
            type: ProductActionType.CLEAR_ERRORS
        })
    }
}

