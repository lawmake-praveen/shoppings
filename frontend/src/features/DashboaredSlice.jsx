import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, headers } from "./AuthSlice";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const options = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(`${BASE_URL}getProducts/0/10`, options).then(
      (res) => res.json()
    );
    return response;
  } catch (error) {}
});

let initialState = {
  dashBoardProducts: [],
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      return { ...state, dashBoardProducts: payload };
    });
  },
});


export default DashboardSlice.reducer;
// export const { fetchProducts,  }