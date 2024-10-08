import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Task } from "@/modules/HomePage/types/Task";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Task[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
