import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authServices';

const getUserfromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
const initialState = {
    user: getUserfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await authService.handleLoginApi(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const acountType = createAsyncThunk(
    'auth/acountType',
    async (thunkAPI) => {
        try {
            return await authService.handleAcountType();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const businessType = createAsyncThunk(
    'auth/businessType',
    async (thunkAPI) => {
        try {
            return await authService.handleBusinessType();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const create_Account = createAsyncThunk(
    'auth/createAccount',
    async (userAccount, thunkAPI) => {
        try {
            return await authService.handleCreateAccount(userAccount);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAcount = createAsyncThunk(
    'auth/getAcount',
    async (thunkAPI) => {
        try {
            return await authService.handleGetAccount();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAcountId = createAsyncThunk(
    'auth/getAcountId',
    async (id, thunkAPI) => {
        try {
            return await authService.handleGetAccountId(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const PatchAccountId = createAsyncThunk(
    'auth/patchAcountId',
    async (data, thunkAPI) => {
        try {
            return await authService.handlePatchAccountId(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAccountId = createAsyncThunk(
    'auth/deleteAcountId',
    async (id, thunkAPI) => {
        try {
            return await authService.handleDeleteAccountId(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction('Reset_all');

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
        buildeer
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = 'success';
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(acountType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acountType.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.acountType = action.payload;
                state.message = 'success';
            })
            .addCase(acountType.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(businessType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(businessType.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.businessType = action.payload;
                state.message = 'success';
            })
            .addCase(businessType.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(create_Account.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create_Account.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createAccount = action.payload;
                state.message = 'success';
            })
            .addCase(create_Account.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getAcount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAcount.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
                state.message = 'success';
            })
            .addCase(getAcount.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getAcountId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAcountId.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.userId = action.payload;
                state.message = 'success';
            })
            .addCase(getAcountId.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(PatchAccountId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(PatchAccountId.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateAccount = action.payload;
                state.message = 'success';
            })
            .addCase(PatchAccountId.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(deleteAccountId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAccountId.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deleteAccount = action.payload;
                state.message = 'success';
            })
            .addCase(deleteAccountId.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;
