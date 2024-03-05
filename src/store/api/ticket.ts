import { enhancedApi } from ".";

export const ticketApi = enhancedApi.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query<any, void>({
            query() {
                return {
                    method: "GET",
                    url: `/support-tickets`,
                };
            },
        }),
        getTicket: builder.query<any, { ticketId: string }>({
            query(data) {
                return {
                    method: "GET",
                    url: `/support-tickets/${data.ticketId}`,
                };
            },
        }),
        createTicket: builder.mutation<any, { category: string; subject: string, description: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: `/support-tickets/create`,
                    data: data,
                };
            },
        }),
        replyTicket: builder.mutation<any, { ticketId: string; content: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: `/support-tickets/${data.ticketId}/reply`,
                    data: { content: data.content },
                };
            },
        }),
        closeTicket: builder.mutation<any, { ticketId: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: `/support-tickets/${data.ticketId}/close`,
                };
            },
        }),
        getReplies: builder.query<any, { ticketId: string }>({
            query(data) {
                return {
                    method: "GET",
                    url: `/support-tickets/${data.ticketId}/replies`,
                };
            },
        }),
    }),
});

export const {
    useGetTicketsQuery,
    useGetTicketQuery,
    useCreateTicketMutation,
    useReplyTicketMutation,
    useCloseTicketMutation,
    useGetRepliesQuery,
} = ticketApi;