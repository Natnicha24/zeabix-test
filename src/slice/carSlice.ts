import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { Car, CarProps } from "../type/Car";

const initialState: CarProps = {
  cars: [],
  loading: false,
  error: null,
};

export const fetchCars = createAsyncThunk<Car[]>(
  "cars/fetchCars",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/data/cars.json");
      return response.data as Car[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch cars");
    }
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.cars.push(action.payload);
      localStorage.setItem("cars", JSON.stringify(state.cars));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const savedCars = localStorage.getItem("cars");
        state.cars = savedCars ? JSON.parse(savedCars) : action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Fetch Cars failed");
      });
  },
});

export default carSlice.reducer;
export const { addCar } = carSlice.actions;
