import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sponsortimeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sb.ltn.fi' }),
  endpoints: (builder) => ({
    getSponsortimes: builder.query({
      query: ({ page = 0, size = 10, sorting = [{ id: 'timeSubmitted', desc: true }] }) => {
        let path = `/sponsortimes?page=${page + 1}&size=${size}`;
        if (sorting.length > 0) {
          path += `&order_by=${sorting.map((c) => (c.desc ? `-${c.id}` : c.id)).join(',')}`;
        }
        return path;
      },
    }),
  }),
});

export const { useGetSponsortimesQuery } = sponsortimeApi;
