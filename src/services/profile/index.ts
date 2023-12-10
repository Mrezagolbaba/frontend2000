import toast from "react-hot-toast";
import request from "services/adapter";

export const deleteAccount = async (id:string) => {
    try {
        const response = await request.delete(`/bank-accounts/${id}`);
        return response.data;
    }
    catch (error:any) {
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage, { position: "bottom-left" });
        throw new Error(errorMessage);
    }
}