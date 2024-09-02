import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const initialState: FilterState = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUsernameFilter: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmailFilter: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneFilter: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});
export const {
  setNameFilter,
  setUsernameFilter,
  setEmailFilter,
  setPhoneFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
