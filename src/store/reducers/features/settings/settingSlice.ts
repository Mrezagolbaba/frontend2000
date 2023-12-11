import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthenticator, getNotificationSettings, setAuthenticator, updateNotificationSettings } from "services/settings";
import { ISetting } from "types/settings";


const initialState: ISetting = {
    notificationSettings: [],
    authenticator: {
        keyUrl: "",
        secret: "",
    }
};

export const updateNotifSettings = createAsyncThunk('setting/setNotificationSetting', async (data: any) => {
    try {
        const res = await updateNotificationSettings(data);
        return res;
    } catch (error) {
        console.log(error);
    }
});
export const getNotifSettings = createAsyncThunk('setting/getNotificationSetting', async () => {
    try {
        const res = await getNotificationSettings();
        return res;
    } catch (error) {
        console.log(error);
    }
})
export const getAuthenticatorData = createAsyncThunk('setting/getAuthenticator', async () => {
    try {
        const res = await getAuthenticator();
        return res;
    } catch (error) {
        console.log(error);
    }

})
export const setAuthenticatorData = createAsyncThunk('setting/setAuthenticator', async (data: any) => {
    try {
        const res = await setAuthenticator(data);
        return res;
    } catch (error) {
        console.log(error);
    }

})






const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setSetting: (state, action: PayloadAction<ISetting>) => {
            return { ...state, ...action.payload };
        },
        clearSetting: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateNotifSettings.fulfilled, (state, action) => {
                return { ...state, notificationSettings: action.payload };
            })
            .addCase(updateNotifSettings.rejected, (state, action: any) => {
                return state; // You might want to handle errors differently
            })
            .addCase(getNotifSettings.fulfilled, (state, action) => {
                return { ...state, notificationSettings: action.payload };
            })
            .addCase(getNotifSettings.rejected, (state, action: any) => {
                return state; // You might want to handle errors differently
            })
            .addCase(getAuthenticatorData.fulfilled, (state, action) => {
                return { ...state, authenticator: action.payload };
            })
            .addCase(getAuthenticatorData.rejected, (state, action: any) => {
                return state;
            })
            .addCase(setAuthenticatorData.fulfilled, (state, action) => {
                return { ...state, authenticator: action.payload };
            })
            .addCase(setAuthenticatorData.rejected, (state, action: any) => {
                return state; 
            });

    },
});
export const { setSetting, clearSetting } = settingSlice.actions;
export default settingSlice.reducer;