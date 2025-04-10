import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import notificationSettingsApi from "../api/notificationSettingsApi";

interface NotificationSettingsState {
  settings?: NotificationSettings;
}

const initialState: NotificationSettingsState = {
  settings: undefined,
};

const notificationSettingsSlice = createSlice({
  name: "notificationSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationSettingsApi.endpoints.getNotificationSettings.matchFulfilled,
      (state, action) => {
        if (action.payload.settings) {
          state.settings = action.payload.settings;
        }
      }
    );
  },
});

export const selectNotificationSettings = (state: RootState) =>
  state.notificationSettings.settings;

export default notificationSettingsSlice;
