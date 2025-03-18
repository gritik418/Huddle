import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPulses, getUserPulses } from "./pulseAPI";
import { RootState } from "@/app/store";

interface PulseState {
  pulses: Pulse[];
  loading: boolean;
  userPulseLoading: boolean;
  pulseIds: string[];
  userPulseIds: string[];
  userPulses: Pulse[];
  pagination?: { page: number; limit: number; totalPages: number };
  userPulsePagination?: { page: number; limit: number; totalPages: number };
}

const initialState: PulseState = {
  pulses: [],
  pulseIds: [],
  loading: false,
  userPulseIds: [],
  userPulses: [],
  userPulseLoading: false,
};

export const getAllPulsesAsync = createAsyncThunk(
  "pulse/getAllPulses",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getAllPulses(page, limit);
    return response;
  }
);

export const getUserPulsesAsync = createAsyncThunk(
  "pulse/getUserPulses",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getUserPulses(page, limit);
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
        if (!state.userPulseIds.includes(action.payload._id)) {
          state.userPulseIds.unshift(action.payload._id);
          state.userPulses.unshift(action.payload);
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
      })
      .addCase(getUserPulsesAsync.pending, (state) => {
        state.userPulseLoading = true;
      })
      .addCase(getUserPulsesAsync.fulfilled, (state, action) => {
        state.userPulseLoading = false;
        if (action.payload.success) {
          if (action.payload.pulses) {
            action.payload.pulses.forEach((pulse: Pulse) => {
              if (!state.userPulseIds.includes(pulse._id.toString())) {
                state.userPulseIds.push(pulse._id.toString());
                state.userPulses.push(pulse);
              }
            });

            state.userPulsePagination = action.payload.pagination;
          }
        }
      })
      .addCase(getUserPulsesAsync.rejected, (state) => {
        state.userPulseLoading = false;
      });
  },
});

export const { addNewPulse } = pulseSlice.actions;

export const selectPulses = (state: RootState) => state.pulse.pulses;
export const selectPulsesPagination = (state: RootState) =>
  state.pulse.pagination;
export const selectPulsesLoading = (state: RootState) => state.pulse.loading;

export const selectUserPulses = (state: RootState) => state.pulse.userPulses;
export const selectUserPulsesPagination = (state: RootState) =>
  state.pulse.userPulsePagination;
export const selectUserPulsesLoading = (state: RootState) =>
  state.pulse.userPulseLoading;

export default pulseSlice;
