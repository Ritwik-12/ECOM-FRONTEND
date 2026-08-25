 import {configureStore} from '@reduxjs/toolkit';
 import {ProductReducer} from './ProductReducer';
 import {errorReducer} from './errorReducer';

 export const Store=configureStore({
    reducer: {
       products: ProductReducer,
       errors: errorReducer,
    },
    preloadedState: {},

 });

 export default Store;