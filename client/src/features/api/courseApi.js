// Import RTK Query tools
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for course API
const COURSE_API = "http://localhost:8080/api/v1/course";

// Create API slice
export const courseApi = createApi({

  // Unique name for this API slice in Redux store
  reducerPath: "courseApi",

  // Tags help with automatic refetching after mutations
  tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],

  // Base configuration for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,      // All endpoints will use this base URL
    credentials: "include",   // Sends cookies (for authentication)
  }),

  // Define API endpoints
  endpoints: (builder) => ({

    // ---------------- CREATE COURSE (POST) ----------------
    createCourse: builder.mutation({

      // Data we send to backend
      query: ({ courseTitle, category }) => ({
        url: "",        // "" means it uses baseUrl directly
        method: "POST",
        body: { courseTitle, category },    // Data sent in request body
      }),

      // After creating course → refetch creator courses automatically
      invalidatesTags: ['Refetch_Creator_Course']
    }),

    // ---------------- GET CREATOR COURSES (GET) ----------------
    getCreatorCourse: builder.query({  // because we are fetching

      // Fetch courses created by instructor
      query: () => ({
        url: "",     // Calls: http://localhost:8080/api/v1/course
        method: "GET"
      }),
      // Provide tag so it knows when to refetch
      providesTags: ['Refetch_Creator_Course']
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData
      }),
      invalidatesTags: ['Refetch_Creator_Course']
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        method: "GET"
      })
    }),
    //Pass lecturetitle using mutation to create lecture
    createLecture: builder.mutation({
     query: ({lectureTitle, courseId}) => ({
      url:`/${courseId}/lecture`,
      method:"POST",
      body:{lectureTitle}
     }),
    }),
     getCourseLecture: builder.query({
     query: (courseId) => ({
      url:`/${courseId}/lecture`,
      method:"GET",
      }),
      providesTags:['Refetch_Lecture']
    }),
    editLecture: builder.mutation({
      query:({lectureTitle, videoInfo, isPreviewFree, courseId, lectureId}) => ({
        url:`/${courseId}/lecture/${lectureId}`,
        method:"POST",
        body:{lectureTitle, videoInfo, isPreviewFree}
      })
    }),
    removeLecture: builder.mutation({
      query:(lectureId) => ({
        url:`/lecture/${lectureId}`,
        method:"DELETE",
      }),
          invalidatesTags:["Refetch_Lecture"]
    }),
     getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET"
      })
    })
 }),
});


// Export auto-generated React hooks
export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
} = courseApi;