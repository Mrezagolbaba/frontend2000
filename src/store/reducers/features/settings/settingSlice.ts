import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotificationSettings, updateNotificationSettings } from "services/settings";
import { ISetting } from "types/settings";


const initialState: ISetting = {
    fiat_deposit_email: false,
    fiat_deposit_sms: false,
    fiat_withdraw_email: false,
    fiat_withdraw_sms: false,
    crypto_deposit_email: false,
    crypto_deposit_sms: false,
    crypto_withdraw_email: false,
    crypto_withdraw_sms: false,
    login_sms: false,
    login_email: false,
    updates_email: false,
    updates_sms: false,
};

const updateNotifSettings = createAsyncThunk('setting/setNotificationSetting', async (data: any) => {
    try {
        const res = await updateNotificationSettings(data);
        return res;
    } catch (error) {
        console.log(error);
    }
});
const getSettingsNotif = createAsyncThunk('setting/getNotificationSetting', async () => {
    try {
        const res = await getNotificationSettings();
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
            return { ...state, ...action.payload };
        })
        .addCase(updateNotifSettings.rejected, (state, action:any) => {
            return { ...state, ...action.payload };
        })
        .addCase(updateNotifSettings.pending, (state, action:any) => {
            return { ...state, ...action.payload };
        })
        .addCase(getSettingsNotif.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        }
        )
        .addCase(getSettingsNotif.rejected, (state, action:any) => {
            return { ...state, ...action.payload };
        })
        .addCase(getSettingsNotif.pending, (state, action:any) => {
            return { ...state, ...action.payload };
        })
    }

});

export const { setSetting, clearSetting } = settingSlice.actions;
export default settingSlice.reducer;