import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "http://localhost:3308/";

// export const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//   },
// };

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export const loginApi = async (body) => {
  try {
    console.log(` body inside login api call : ${JSON.stringify(body)}`);
    const response = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    return null;
  }
};

export const RegisterApi = async (body) => {
  try {
    console.log(` body inside register api call : ${JSON.stringify(body)}`);
    const response = await fetch(`${BASE_URL}register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    return null;
  }
};
