//under the hood it uses RTK query, which is a livbrary for interacting with backend api
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: ''
})


export const apiSlice = createApi({
    baseQuery,
    //it has to do with catching
    tagTypes: ["User"],
    endpoints: (builder) => ({})
})