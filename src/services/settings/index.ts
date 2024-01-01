import request from "services/adapter";

export const updateNotificationSettings = async ( data: any) => { 
    try {
        const response = await request.patch(`user-settings/${data}/toggle`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Notification settings failed. Please try again."
        );
    }
}
export const getNotificationSettings = async () => { 
    try {
        const response = await request.get("user-settings");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Notification settings failed. Please try again."
        );
    }
}
export const getAuthenticator = async () => {
    try {
        const response = await request.get("/auth/setup-authenticator");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Notification settings failed. Please try again."
        );
    }
}
export const setAuthenticator = async (data: any) => {
    try {
        const response =await request.post("/auth/setup-authenticator", data);
        return response;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Notification settings failed. Please try again."
        );
    }
}