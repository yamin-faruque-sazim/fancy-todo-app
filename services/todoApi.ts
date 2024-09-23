import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Task } from "@/modules/HomePage/types/Task";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Task[], void>({
      query: () => "/todos",
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
