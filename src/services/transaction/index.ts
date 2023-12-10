import request from "services/adapter"

export const getTransactions = async ({id: string}) => {
    try {
        const response = await request.get(`/transactions/`)
        return response.data

    } catch (error: any) {
        console.log(error)
    }
}