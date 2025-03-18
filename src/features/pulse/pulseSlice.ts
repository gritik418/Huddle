import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPulses } from "./pulseAPI";
import { RootState } from "@/app/store";

interface PulseState {
  pulses: Pulse[];
  loading: boolean;
  pulseIds: string[];
  pagination?: { page: number; limit: number; totalPages: number };
}

const initialState: PulseState = {
  pulses: [],
  pulseIds: [],
  loading: false,
};

export const getAllPulsesAsync = createAsyncThunk(
  "pulse/getAllPulses",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getAllPulses(page, limit);
    return response;
  }
);

const pulseSlice = createSlice({
  name: "pulse",
  reducerPath: "pulse",
  initialState,
  reducers: {
    addNewPulse: (state, action) => {
      if (action.payload._id) {
        if (!state.pulseIds.includes(action.payload._id)) {
          state.pulseIds.unshift(action.payload._id);
          state.pulses.unshift(action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPulsesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPulsesAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          if (action.payload.pulses) {
            action.payload.pulses.forEach((pulse: Pulse) => {
              if (!state.pulseIds.includes(pulse._id.toString())) {
                state.pulseIds.push(pulse._id.toString());
                state.pulses.push(pulse);
              }
            });

            state.pagination = action.payload.pagination;
          }
        }
      })
      .addCase(getAllPulsesAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addNewPulse } = pulseSlice.actions;

export const selectPulses = (state: RootState) => state.pulse.pulses;
export const selectPulsesPagination = (state: RootState) =>
  state.pulse.pagination;
export const selectPulsesLoading = (state: RootState) => state.pulse.loading;

export default pulseSlice;
