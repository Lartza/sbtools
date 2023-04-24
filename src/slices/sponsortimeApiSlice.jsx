import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sponsortimeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sb.ltn.fi' }),
  endpoints: (builder) => ({
    getSponsortimes: builder.query({
      query: ({
        page = 0, size = 10, sorting, columnFilters = [{ id: 'timeSubmitted', desc: true }],
      }) => {
        let path = `/sponsortimes?page=${page + 1}&size=${size}`;
        columnFilters.forEach((currentValue, index, arr) => {
          switch (currentValue.id) {
            case 'videoID':
              path += `&videoID=${currentValue.value}`;
              break;
            case 'length':
              if (currentValue.value[0]) {
                path += `&length__gte=${currentValue.value[0]}`;
              }
              if (currentValue.value[1]) {
                path += `&length__lte=${currentValue.value[1]}`;
              }
              break;
            case 'votes':
              if (currentValue.value[0]) {
                path += `&votes__gte=${currentValue.value[0]}`;
              }
              if (currentValue.value[1]) {
                path += `&votes__lte=${currentValue.value[1]}`;
              }
              break;
            case 'views':
              if (currentValue.value[0]) {
                path += `&views__gte=${currentValue.value[0]}`;
              }
              if (currentValue.value[1]) {
                path += `&views__lte=${currentValue.value[1]}`;
              }
              break;
            case 'userID':
              path += `&userID=${currentValue.value}`;
              break;
            case 'userName':
              path += `&user__userNameID=${currentValue.value}`;
              break;
            default:
              break;
          }
        });
        if (sorting.length > 0) {
          path += `&order_by=${sorting.map((c) => (c.desc ? `-${c.id}` : c.id)).join(',')}`;
        }
        return path;
      },
    }),
    getSponsortimesByVideoId: builder.query({
      query: ({
        videoID, page = 0, size = 10, sorting = [{ id: 'timeSubmitted', desc: true }],
      }) => {
        let path = `/sponsortimes?videoID=${videoID}&page=${page + 1}&size=${size}`;
        if (sorting.length > 0) {
          path += `&order_by=${sorting.map((c) => (c.desc ? `-${c.id}` : c.id)).join(',')}`;
        }
        return path;
      },
    }),
    getSponsortimesByUUID: builder.query({
      query: (UUID) => `/sponsortimes/${UUID}`,
    }),
    getSponsortimesByUsername: builder.query({
      query: ({
        userName, page = 0, size = 10, sorting = [{ id: 'timeSubmitted', desc: true }],
      }) => {
        let path = `/sponsortimes?user__userName=${userName}&page=${page + 1}&size=${size}`;
        if (sorting.length > 0) {
          path += `&order_by=${sorting.map((c) => (c.desc ? `-${c.id}` : c.id)).join(',')}`;
        }
        return path;
      },
    }),
    getSponsortimesByUserId: builder.query({
      query: ({
        userID, page = 0, size = 10, sorting = [{ id: 'timeSubmitted', desc: true }],
      }) => {
        let path = `/sponsortimes?userID=${userID}&page=${page + 1}&size=${size}`;
        if (sorting.length > 0) {
          path += `&order_by=${sorting.map((c) => (c.desc ? `-${c.id}` : c.id)).join(',')}`;
        }
        return path;
      },
    }),
    getUpdated: builder.query({
      query: () => '/updated',
    }),
  }),
});

export const {
  useGetSponsortimesQuery,
  useGetSponsortimesByVideoIdQuery,
  useGetSponsortimesByUUIDQuery,
  useGetSponsortimesByUsernameQuery,
  useGetSponsortimesByUserIdQuery,
  useGetUpdatedQuery,
} = sponsortimeApi;
