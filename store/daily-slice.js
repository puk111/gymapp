import { createSlice } from "@reduxjs/toolkit";
import { removeDuplicateObjects } from "../helpers/functions/removeDuplicates";

const initialState = { day: "", active: "", exerciseCounter: 0 };

const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    setSoftData: (state, action) => {
      (state.day = action.payload.day),
        (state.active = action.payload.active),
        (state.exerciseCounter = action.payload.exerciseCounter);
    },
  },
});

const dailyTreningProggresArrSlice = createSlice({
  name: "dailyTreningProggresArr",
  initialState: [],
  reducers: {
    setTrainingProggresArrStore: (state, action) => {
      if (state.length > 1) {
        return state;
      } else {
        // state.push(...action.payload);
        const updatedActionPayload = action.payload.map((item) => {
          return {
            ...item,
            progressObj: [...item.seriesObj],
          };
        });
        state.push(...updatedActionPayload);
      }

      // const updatedActionPayload = action.payload.map((item) => {
      //   return {
      //     ...item,
      //     progressObj: [...item.seriesObj],
      //   };
      // });
      // return [...updatedActionPayload];
    },
    setProggressStore: (state, action) => {
      const { id, obj } = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          let arr = [...item.progressObj, obj];
          const filltered = removeDuplicateObjects(arr, "id");
          return { ...item, progressObj: filltered };
        }
        return item;
      });
    },
    onFinishedExercise: (state, action) => {
      const { id, elId } = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          let arr = [...item.seriesObj];
          let needed = arr[elId];
          let newObj = { ...needed, finished: true };
          let arrWithDuplicates = [...arr, newObj];
          const filltered = removeDuplicateObjects(arrWithDuplicates, "id");
          return { ...item, seriesObj: filltered };
        }
        return item;
      });
    },
    afterSendData: (state, action) => {
      return action.payload.map((item) => {
        const progressObj = item.seriesObj;
        return { ...item, progressObj };
      });
    },
  },
});

const dailyStoperSlice = createSlice({
  name: "dailyStoper",
  initialState: {
    timeInSec: "00",
    idTimer: null,
    idxEl: null,
    isRunning: false,
  },
  reducers: {
    setCurrentTimer: (state, action) => {
      (state.timeInSec = action.payload.timeInSec),
        (state.idTimer = action.payload.idTimer),
        (state.idxEl = action.payload.idxEl),
        (state.isRunning = action.payload.isRunning);
    },
  },
});

export const { setSoftData } = dailySlice.actions;

export const {
  setTrainingProggresArrStore,
  setProggressStore,
  onFinishedExercise,
  afterSendData,
} = dailyTreningProggresArrSlice.actions;
export const { setCurrentTimer } = dailyStoperSlice.actions;

export { dailySlice, dailyTreningProggresArrSlice, dailyStoperSlice };
