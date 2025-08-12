import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Driver, DriverProps } from "../type/driver";
import axios from "axios";

export const fetchDrivers = createAsyncThunk<Driver[]>(
  "cars/fetchDrivers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/data/drivers.json");
      return response.data as Driver[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch cars");
    }
  }
);

const initialState:DriverProps = {
  drivers: [],
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Fetch Cars failed");
      });
  },
});

export default driverSlice.reducer