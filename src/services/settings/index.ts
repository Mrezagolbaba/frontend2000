import request from "services/adapter";

export const updateNotificationSettings = async ( data: any) => { 
    try {
        const response = await request.post(`/v1/user-settings/${data}/toggle`);
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