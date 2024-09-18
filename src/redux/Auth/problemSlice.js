import { createSlice } from '@reduxjs/toolkit';

const problemsSlice = createSlice({
  name: 'problems',
  initialState: {
    problems: [], // Array to store problems data
  },
  reducers: {
    setProblems: (state, action) => {
      state.problems = action.payload;
    },
    clearProblems: (state) => {
      state.problems = [];
    },
  },
});

export const { setProblems, clearProblems } = problemsSlice.actions;
export default problemsSlice.reducer;