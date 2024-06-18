// jobSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJob,
  getSingleJob,
  copyOfJob,
} from "../actions/job"; // Import your async actions

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer for creating a job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducer for getting all jobs
      .addCase(getAllJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = [action.payload];
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteJob.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = state.jobs.filter((item) => {
          return item._id !== action.payload;
        });
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editJob.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;

        let index = state.jobs?.findIndex(
          (item) => item._id === action.payload.id
        );
        state.jobs[index] = action.payload.data;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(copyOfJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(copyOfJob.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fulfilled action payload", action.payload);
        if (Array.isArray(action.payload)) {
          state.jobs = [...state.jobs, ...action.payload];
        } else {
          console.error(
            "Expected payload to be an array, but received:",
            action
          );
          state.error = "Unexpected payload structure";
        }
      })
      .addCase(copyOfJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
