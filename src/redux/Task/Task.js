import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const Taskapi = createApi({
  reducerPath: "Taskapi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders:(headers, { getState }) => {
      const token = getState().auth?.data?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Task'],
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => '/Category',
    }),
    getProblems: build.query({
      query: () => '/Category',
    }),
    getTaskById: build.query({
      query: (id) => `/problems/${id}`, // Adjust the endpoint path as needed
    }),

    getAllProblemsByCategory: build.query({
      query: (id) => `/problems?category=${id}`
    }),

   addTask: build.mutation({
      query: (body) => ({
        url: '/problems',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task']
    }),
    editTask: build.mutation({
      query: ({id, body}) => ({
        url: `/problems/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task']
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/problems/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['Task']
    }),
    searchTask: build.query({
      query: (taskname) => ({
        url: '/search-task',
        method: 'GET',
        params:{task_name: taskname}
      }),
      invalidatesTags: ['Task']
    }),
  }),
})

export const {useGetTasksQuery,useGetTaskByIdQuery,useAddTaskMutation,useEditTaskMutation,useDeleteTaskMutation,useSearchTaskQuery, useLazySearchTaskQuery, useGetAllProblemsByCategoryQuery} = Taskapi
export default Taskapi