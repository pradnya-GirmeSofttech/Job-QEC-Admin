// jobSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJob,
  getSingleJob,
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
      });
  },
});

export default jobSlice.reducer;
