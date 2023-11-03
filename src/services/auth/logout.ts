import {
    useMutation,
    UseMutationOptions,
    UseMutationResult
} from "react-query";
import request from "../adapter";

const logout = async () => {
    try {
        const response = await request.post("/auth/logout");
        return response.data;
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message || "Request failed. Please try again.");
    }
}
const useLogout = (
): UseMutationResult<any, Error, any, any> => {
    return useMutation(logout, {});
};
export default useLogout;