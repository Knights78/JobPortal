import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import JobPage from "./components/JobPage";
import BrowsePage from "./components/BrowsePage";
import ProfilePage from "./components/ProfilePage";
import JobDescription from "./components/jobDescription";
import UpdateProfileDialog from "./components/UpdateProfileDialog";
import Companies from "./components/admin/Companies";
import CreateCompanies from "./components/admin/CreateCompanies";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import CompanySetup from "./components/admin/CompanySetup";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <JobPage />,
  },
  {
    path: "/browse",
    element: <BrowsePage />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path:'/updateProfile',
    element:<UpdateProfileDialog/>
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  //path for admins
  {
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<CreateCompanies/>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
    
  }
]);
const App = () => {
  return (
    <GoogleOAuthProvider clientId="110336232874-1vqqams19gtugdgcja15hqmoirnj5hu3.apps.googleusercontent.com">
      <RouterProvider router={appRouter} />
    </GoogleOAuthProvider>
  );
};

export default App;
