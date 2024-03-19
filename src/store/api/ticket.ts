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
      providesTags: ["ticket"],
    }),
    getTicket: builder.query<any, string>({
      query(id) {
        return {
          method: "GET",
          url: `/support-tickets/${id}`,
        };
      },
    }),
    createTicket: builder.mutation<
      any,
      { category: string; subject: string; description: string }
    >({
      query(data) {
        return {
          method: "POST",
          url: `/support-tickets/create`,
          data: data,
        };
      },
      invalidatesTags: ["ticket"],
    }),
    replyTicket: builder.mutation<any, { ticketId: string; content: string }>({
      query(data) {
        return {
          method: "POST",
          url: `/support-tickets/${data.ticketId}/reply`,
          data: { content: data.content },
        };
      },
      invalidatesTags: ["reply-ticket"],
    }),
    closeTicket: builder.mutation<any, { ticketId: string }>({
      query(data) {
        return {
          method: "POST",
          url: `/support-tickets/${data.ticketId}/close`,
        };
      },
    }),
    getReplies: builder.query<any, string>({
      query(id) {
        return {
          method: "GET",
          url: `/support-tickets/${id}/replies`,
        };
      },
      providesTags: ["reply-ticket"],
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
