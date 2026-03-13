import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "create",
  athleteId: null,
  formData: {
    basicInfo: {},
    family: {},
    athlete: {},
    overview: {},
    stats: {},
    education: [],
    achievements: [],
    media: [],
    mediaToDeleted: [],
  },
};

const athleteFormSlice = createSlice({
  name: "athleteForm",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload; // create | edit | ai
    },

    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    updateSection: (state, action) => {
      const { section, data } = action.payload;

      if (Array.isArray(data)) {
        state.formData[section] = data;
      } else {
        state.formData[section] = {
          ...state.formData[section],
          ...data,
        };
      }
    },

    setAthleteId: (state, action) => {
      state.athleteId = action.payload;
    },

    resetForm: () => initialState,
  },
});

export const { setFormData, updateSection, setAthleteId, resetForm, setMode } =
  athleteFormSlice.actions;

export default athleteFormSlice.reducer;
