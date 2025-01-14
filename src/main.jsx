import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
// import { ThemeProvider } from "./Hooks/ThemeProvider ";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider/AuthProvider";
import { ThemeProvider } from "./hooks/ThemeProvider ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer position="top-center" autoClose={3000} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
