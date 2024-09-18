// src/redux/Auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api', prepareHeaders:(headers, { getState }) => {
    const token = getState().auth?.data?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  } }), // Adjust base URL as needed
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login', // Adjust to your API endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/register', // Adjust to your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    addRevision: builder.mutation({
      query: (data) => ({
        url: '/add-revision', // Adjust to your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    removeRevision: builder.mutation({
      query: (data) => ({
        url: '/remove-revision', // Adjust to your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAddRevisionMutation, useRemoveRevisionMutation } = authApi;
export default authApi;
