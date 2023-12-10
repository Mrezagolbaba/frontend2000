import { UseMutationResult, useMutation } from "react-query";
import request from "../adapter";
const session = async () => {
    try {
        const response = await request.get("/auth/sessions");
        return response.data;
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message || "Request failed. Please try again.");
    }
}
const useSession = (
): UseMutationResult<any, Error, any, any> => {
    return useMutation(session, {});
};
export default useSession;