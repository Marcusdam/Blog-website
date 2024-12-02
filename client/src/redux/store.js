import {configureStore} from '@reduxjs/toolkit'
import postReducer from './postSlice';
import authReducer from './authSlice';
import categoryReducer from './category';


const store = configureStore({
    reducer:{
        auth: authReducer,
        post: postReducer,
        categories: categoryReducer
    },
});

console.log(store.getState());

export default store