import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: null },
  reducers: {
    loadingStatus(state, action) {
      state.loading = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const disapearRequest = (stat) => {
  return (dispatch) => {
    dispatch(
      loadingActions.loadingStatus({
        status: stat.status,
        message: stat.message,
      })
    );
    setTimeout(() => {
      dispatch(loadingActions.loadingStatus(""));
    }, 4000);
  };
};

export const loadingActions = loadingSlice.actions;

export default loadingSlice;
