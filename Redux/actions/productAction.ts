import { ProductActionType } from '../action-types/productActionType';



//All- Products----------------------------------------
interface allProductsRequestAction {
    type: ProductActionType.ALL_PRODUCTS_REQUEST
}

interface allProductsSuccessAction {
    type: ProductActionType.ALL_PRODUCTS_SUCCESS
    payload: any[]
}

interface allProductsFailedAction {
    type: ProductActionType.ALL_PRODUCTS_FAIL
    payload: String
}


//Single Products-------------------------------------
interface singleProductRequestAction {
    type: ProductActionType.PRODUCT_DETAILS_REQUEST
}

interface singleProductSuccessAction {
    type: ProductActionType.PRODUCT_DETAILS_SUCCESS
    payload: object
}

interface singleProductFailedAction {
    type: ProductActionType.PRODUCT_DETAILS_FAIL
    payload: String
}

//Upload - pictures-------------------------------------

interface uploadPictureRequest {
    type: ProductActionType.UPLOAD_PICTURE_REQUEST
}

interface uploadPictureSuccess {
    type: ProductActionType.UPLOAD_PICTURE_SUCCESS,
    payload: object[]
}

interface uploadPictureFail {
    type: ProductActionType.UPLOAD_PICTURE_FAIL
    payload: String
}

interface uploadProductReset {
    type: ProductActionType.UPLOAD_PICTURE_RESET
}


// create - product ----------------------------------------
interface createProductRequest {
    type: ProductActionType.NEW_PRODUCT_REQUEST
}

interface createProductSuccess {
    type: ProductActionType.NEW_PRODUCT_SUCCESS,
    payload: object
}

interface createProductFail {
    type: ProductActionType.NEW_PRODUCT_FAIL,
    payload: String
}

interface createProductReset {
    type: ProductActionType.NEW_PRODUCT_RESET
}


// - Delete Product 
interface deleteProductRequest {
    type: ProductActionType.DELETE_PRODUCT_REQUEST
}

interface deleteProductSuccess {
    type: ProductActionType.DELETE_PRODUCT_SUCCESS
    payload: String
}

interface deleteProductFailure {
    type: ProductActionType.DELETE_PRODUCT_FAIL
    payload: String
}

interface deleteProductReset {
    type: ProductActionType.DELETE_PRODUCT_RESET
}


//== Update product -------------------------------/
interface updateProductRequest {
    type : ProductActionType.UPDATE_PRODUCT_REQUEST
}

interface updateProductSuccess {
    type: ProductActionType.UPDATE_PRODUCT_SUCCESS
    payload: object
}

interface updateProductFail {
    type: ProductActionType.UPDATE_PRODUCT_FAIL
    payload: String
}

interface updateProductReset {
    type: ProductActionType.UPDATE_PRODUCT_RESET
}


//clear- Product Errors
interface clearErrors {
    type: ProductActionType.CLEAR_ERRORS
}

export type ProductAction = 

    | allProductsRequestAction
    | allProductsSuccessAction
    | allProductsFailedAction

    | singleProductRequestAction
    | singleProductSuccessAction
    | singleProductFailedAction

    | uploadPictureRequest
    | uploadPictureSuccess
    | uploadPictureFail
    | uploadProductReset

    | createProductRequest
    | createProductSuccess
    | createProductFail
    | createProductReset

    | deleteProductRequest
    | deleteProductSuccess
    | deleteProductFailure
    | deleteProductReset

    | updateProductRequest
    | updateProductSuccess
    | updateProductFail
    | updateProductReset

    | clearErrors







