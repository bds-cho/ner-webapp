import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import NewAccountPage from "./pages/NewAccountPage";
import TextAnalysePage from "./pages/TextAnalysePage";
import UserFeedPage from "./pages/UserFeedPage";

import { AuthenticatedLayout } from "./pages/AuthenticatedLayout";
import { UnauthenticatedLayout } from "./pages/Unauthenticatedlayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/text-analyse",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/text-analyse",
        element: <TextAnalysePage />,
      },
    ],
  },
  {
    path: "/user-feed",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/user-feed",
        element: <UserFeedPage />,
      },
    ],
  },
  {
    path: "/",
    element: <UnauthenticatedLayout />,
    children: [
      { path: "/", element: <StartPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/new-account", element: <NewAccountPage /> },
      { path: "/text-analyse", element: <TextAnalysePage /> },

    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
