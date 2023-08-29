import { ProductActionType } from '../action-types/productActionType';
import { ProductAction } from '../actions/productAction';


interface allProductsState {
    loading: Boolean
    products: any[]
    error: null
    productCount?: Number
    filteredProductCount?: Number
}

const allProductsInitialState = {
    loading: false,
    products: [],
    error: null
}

export const fetchAllProducts = (state: allProductsState = allProductsInitialState, action: ProductAction) => {
    switch (action.type) {
        case ProductActionType.ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ProductActionType.ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            }

        case ProductActionType.ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }
        default:
            return state;
    }
}

interface singleProductState {
    loading: Boolean,
    product: object
    error: null
}

const singleProductInitialState = {
    loading: false,
    product: {},
    error: null
}


export const fetchSingleProduct = (state: singleProductState = singleProductInitialState, action: ProductAction) => {

    switch (action.type) {
        case ProductActionType.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {},
                error: null
            }
        case ProductActionType.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                error: null
            }
        case ProductActionType.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                product: {},
                error: action.payload
            }
        default:
            return state
    }
}

interface uploadPictureProps {
    upload_loading: Boolean
    upload_links: object[]
    upload_success: Boolean
    upload_error: null
}

const UploadInitialState = {
    upload_loading: false,
    upload_links: [],
    upload_success: false,
    upload_error: null
}

export const uploadPicture = (state: uploadPictureProps = UploadInitialState, action: ProductAction) => {

    switch (action.type) {
        case ProductActionType.UPLOAD_PICTURE_REQUEST:
            return {
                upload_loading: true,
                upload_links: [],
                upload_success: false,
                upload_error: null
            }

        case ProductActionType.UPLOAD_PICTURE_SUCCESS:
            return {
                ...state,
                upload_loading: false,
                upload_links: action.payload,
                upload_success: true
            }

        case ProductActionType.UPLOAD_PICTURE_FAIL:
            return {
                ...state,
                upload_loading: false,
                upload_links: [],
                upload_success: false,
                upload_error: action.payload
            }

        case ProductActionType.UPLOAD_PICTURE_RESET:
            return {
                ...state,
                upload_success: false,
                upload_links: [],
            }


        case ProductActionType.CLEAR_ERRORS:
            return {
                ...state,
                upload_error: null
            }

        default:
            return state
    }

}

interface createProductProps {
    loading: Boolean
    newProduct: object
    success: Boolean
    error: String | null
}

const newProductInitialState = {
    loading: false,
    newProduct: {},
    success: false,
    error: null
}

export const createProduct = (state: createProductProps = newProductInitialState, action: ProductAction) => {

    switch (action.type) {
        case ProductActionType.NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                newProduct: {},
                success: false,
                error: null
            }
        case ProductActionType.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                newProduct: action.payload,
                success: true,
                error: null
            }
        case ProductActionType.NEW_PRODUCT_FAIL:
            return {
                loading: false,
                newProduct: {},
                success: false,
                error: action.payload
            }

        case ProductActionType.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
                newProduct: {}
            }
        case ProductActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

interface EditProductProps {
    edit_loading: Boolean
    isDeleted?: Boolean
    isUpdated?: Boolean
    message?: String | null
    edit_error: null | String
}


const initialEditProductProps = {
    edit_loading: false,
    isDeleted: false,
    isUpdated: false,
    message: null,
    edit_error: null
}


export const EditProduct = (state: EditProductProps = initialEditProductProps, action: ProductAction) => {

    switch (action.type) {
        case ProductActionType.DELETE_PRODUCT_REQUEST:
        case ProductActionType.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                edit_loading: true
            }
        case ProductActionType.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                edit_loading: false,
                isDeleted: true,
                message: action.payload,
                edit_error: null
            }
        case ProductActionType.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                edit_loading: false,
                isUpdated: true,
                message: action.payload,
                edit_error: null
            }

        case ProductActionType.DELETE_PRODUCT_RESET:
        case ProductActionType.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                edit_loading: false,
                isDeleted: false,
                isUpdated: false,
                message: null,
                edit_error: null

            }
        case ProductActionType.DELETE_PRODUCT_FAIL:
        case ProductActionType.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                edit_loading: false,
                isDeleted: false,
                isUpdated: false,
                message: null,
                edit_error: action.payload
            }
        case ProductActionType.CLEAR_ERRORS:
            return {
                ...state,
                edit_error: null
            }
        default:
            return state
    }

}







