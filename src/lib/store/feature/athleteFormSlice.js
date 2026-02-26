import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
};

const athleteFormSlice = createSlice({
  name: "athleteForm",
  initialState,
  reducers: {
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

export const { setFormData, updateSection, setAthleteId, resetForm } =
  athleteFormSlice.actions;

export default athleteFormSlice.reducer;
