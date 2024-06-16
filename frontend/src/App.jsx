import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import StartPage from "./pages/StartPage";
import LoginPage from "./pages/login-registration/LoginPage";
import NewAccountPage from "./pages/login-registration/NewAccountPage";
import TextAnalysePage from "./pages/TextAnalysePage";
import UserFeedPage from "./pages/UserFeedPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthenticatedLayout } from "./pages/AuthenticatedLayout";
import { UnauthenticatedLayout } from "./pages/Unauthenticatedlayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
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
