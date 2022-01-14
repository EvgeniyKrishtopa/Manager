import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from 'typings/interfaces';

const initialState = {
  users: [] as UserData[],
  id: 1,
  loading: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://reqres.in/api/users?delay=1');
    return (await response.json()).data as UserData[];
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    incrementByAmount(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { incrementByAmount } = usersSlice.actions;

export default usersSlice.reducer;
