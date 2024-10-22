import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Task } from "@/modules/HomePage/types/Task";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    // getTodos: builder.query<Task[], void>({
    //   query: () => "/todos",
    //   providesTags: ["Todos"],
    // }),
    // getTodos: builder.query<
    //   Task[],
    //   {
    //     filterBy?: string;
    //     priority?: string;
    //     sortOrder?: string;
    //     dueDateSort?: string;
    //     isCompleted?: string;
    //   }
    // >({
    //   query: ({
    //     filterBy,
    //     priority,
    //     sortOrder,
    //     dueDateSort,
    //     isCompleted,
    //   } = {}) => {
    //     const queryParams = new URLSearchParams();

    //     if (filterBy) queryParams.append("filterBy", filterBy);
    //     if (priority) queryParams.append("priority", priority);
    //     if (sortOrder) queryParams.append("sortOrder", sortOrder);
    //     if (dueDateSort) queryParams.append("dueDateSort", dueDateSort);
    //     if (isCompleted) queryParams.append("isCompleted", isCompleted);

    //     return `/todos?${queryParams.toString()}`;
    //   },
    //   providesTags: ["Todos"],
    // }),

    getTodos: builder.query<Task[], { filterBy?: string }>({
      query: ({ filterBy = "all" }) => {
        const queryParams = new URLSearchParams();

        switch (filterBy) {
          case "priority-high-low":
            queryParams.append("filterBy", "priority");
            queryParams.append("sortOrder", "desc");
            break;
          case "priority-low-high":
            queryParams.append("filterBy", "priority");
            queryParams.append("sortOrder", "asc");
            break;
          case "due-date-asc":
            queryParams.append("dueDateSort", "asc");
            break;
          case "completed":
            queryParams.append("isCompleted", "true");
            break;
          case "active":
            queryParams.append("isCompleted", "false");
            break;
          case "high":
            queryParams.append("filterBy", "priority");
            queryParams.append("priority", "HIGH");
            break;
          case "medium":
            queryParams.append("filterBy", "priority");
            queryParams.append("priority", "MEDIUM");
            break;
          case "low":
            queryParams.append("filterBy", "priority");
            queryParams.append("priority", "LOW");
            break;
          // Optionally handle default case here
          default:
            break;
        }

        return `/todos?${queryParams.toString()}`;
      },
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

    completeTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteCompletedTodos: builder.mutation<void, void>({
      query: () => ({
        url: `/todos/completed`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useDeleteCompletedTodosMutation,
} = todoApi;
