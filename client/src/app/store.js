// Import Redux Toolkit function to create store
import { configureStore } from "@reduxjs/toolkit";

// Import combined reducers
import rootReducer from "./rootReducer";

// Import RTK Query API slice
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";

// ---------------- CREATE REDUX STORE ----------------
export const appStore = configureStore({

    // All reducers combined here
    reducer: rootReducer,

    // Add RTK Query middleware
    // This enables caching, invalidation, auto refetch, etc.
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
});


// ---------------- INITIALIZE APP ----------------

// This function runs when app starts
// It manually loads the logged-in user
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))   // Always fetch fresh user data
}

// Call initialize function
initializeApp()