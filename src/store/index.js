import { configureStore } from "@reduxjs/toolkit";
import products from "../components/products/productsSlice";

const store = configureStore({
    reducer: { products }
})

export default store;