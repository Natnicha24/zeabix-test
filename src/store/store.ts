import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "../slice/carSlice";
import DriverReducer from "../slice/driverSlice";

export const store = configureStore({
  reducer: {
    cars: CarReducer,
    drivers: DriverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
