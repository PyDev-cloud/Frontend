import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/loging/PrivateRoute";
import Layout from "./components/templets/Layout";
import Login from "./pages/loging/Login";
import DraftUsersPage from "./pages/users/DraftUserPage";
import DraftUserDetail from "./pages/users/DraftUserDetail";
import GeneralUsersList from "./pages/users/GeneralUsersList";
// অন্যান্য পেজ import করতে পারো এখানে
// import GeneralUsersPage from "./pages/users/GeneralUsersPage";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div style={{ padding: 20 }}>লোড হচ্ছে...</div>;
  }

  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Default redirect to draft users */}
        <Route index element={<Navigate to="/" replace />} />

        {/* Redirect /users → /users/draft */}
        <Route path="users" element={<Navigate to="/users/create" replace />} />

        {/* Draft Users */}
        <Route
          path="users/create"
          element={
            <PrivateRoute roles={["admin", "manager"]}>
              <DraftUsersPage />
            </PrivateRoute>
          }
        />




        <Route
  path="users/draft/:id"
  element={
    <PrivateRoute roles={["admin", "manager"]}>
      <DraftUserDetail />
    </PrivateRoute>
  }
/>



<Route
  path="users/list"
  element={
    <PrivateRoute roles={["admin", "manager"]}>
      <GeneralUsersList />
    </PrivateRoute>
  }
/>

        {/* Example: অন্যান্য ইউজার ম্যানেজমেন্ট পেজ */}
        {/*
        <Route
          path="users/general"
          element={
            <PrivateRoute roles={["admin"]}>
              <GeneralUsersPage />
            </PrivateRoute>
          }
        /> 
        */}
      </Route>

      {/* Catch-all: যদি কোন route match না করে */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
