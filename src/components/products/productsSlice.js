import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import md5 from "md5";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
  ids: [],
  products: [],
  idsLoadingStatus: "idle",
  productsLoadingStatus: "idle",
  itemsPerPage: 50,
  itemOffset: 0,
  currentPage: 0,
}

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const date = year + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day);

const url = "https://api.valantis.store:41000/";
const headers = {
  "Content-Type": "application/json",
  "X-Auth": md5(`Valantis_${date}`)
}
const body = {
  "action": "get_ids",
  "params": {
    "offset": 0,
  }
}
const bodyByFilter = {
  "action": "filter",
  "params": { "price": 2000.0 }
}

export const fetchIDs = createAsyncThunk(
  "products/fetchIDs",
  async (obj = null) => {
    const { request } = useHttp();
    let data = "";
    if (obj === null) {
      data = await request(url, "POST", JSON.stringify(body), headers);
    } else {
      bodyByFilter.params = obj;
      data = await request(url, "POST", JSON.stringify(bodyByFilter), headers);
    }
    return Array.isArray(data?.result) ? data.result : [];
  }
)

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (ids = null) => {
    const body = {
      "action": "get_items",
      "params": { "ids": ids }
    }
    const { request } = useHttp();
    const data = await request(url, "POST", JSON.stringify(body), headers);
    return Array.isArray(data?.result) ? data.result : [];
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeItemOffset: (state, action) => {
      state.itemOffset = action.payload;
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearProducts: state => {
      state.products = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIDs.pending, state => { state.idsLoadingStatus = "loading" })
      .addCase(fetchIDs.fulfilled, (state, action) => {
        state.idsLoadingStatus = "idle";
        state.ids = Array.from(new Set(action.payload));
      })
      .addCase(fetchIDs.rejected, state => {
        state.idsLoadingStatus = "error"
      })

      .addCase(fetchProducts.pending, state => { state.productsLoadingStatus = "loading" })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = "idle";
        const data = action.payload.filter((value, i, self) => {
          return i === self.findIndex((t) => {
            return t.id === value.id;
          })
        });
        state.products[state.currentPage] = data;
      })
      .addCase(fetchProducts.rejected, state => {
        state.productsLoadingStatus = "error"
      })
      .addDefaultCase(() => {})
  }
})

const { reducer, actions } = productSlice;

export const { changeItemOffset, changeCurrentPage, clearProducts } = actions;
export default reducer;