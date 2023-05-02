import { configureStore } from '@reduxjs/toolkit';
import ExpReducer from './expense-slice';
import authReducer from './auth-slice'

const store = configureStore({
    reducer: { exp : ExpReducer, auth: authReducer}
})
export default store;