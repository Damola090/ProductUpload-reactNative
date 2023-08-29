import { combineReducers } from 'redux';

import {
    fetchAllProducts,
    fetchSingleProduct,
    uploadPicture,
    createProduct,
    EditProduct,
} from '../reducers/productReducer';


const reducers = combineReducers({
    AllProducts: fetchAllProducts,
    singleProduct: fetchSingleProduct,
    uploadPicture: uploadPicture,
    createProduct: createProduct,
    editProduct: EditProduct,
})

export default reducers;

export type RootState = ReturnType<typeof reducers>

