import { configureStore } from "@reduxjs/toolkit";
import {
  dailySlice,
  dailyTreningProggresArrSlice,
  dailyStoperSlice,
} from "./daily-slice";
import loadingSlice from "./loading-slice";

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    daily: dailySlice.reducer,
    dailyTreningProggresArr: dailyTreningProggresArrSlice.reducer,
    dailyStoper: dailyStoperSlice.reducer,
  },
});

export default store;
