import toast from "react-hot-toast";
import request from "services/adapter";

export const getAllWallets = async () => {
    try {
        const response = await request.get(`/wallets`);
        return response.data;
    }
    catch (error:any) {
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage, { position: "bottom-left" });
        throw new Error(errorMessage);
    }
}