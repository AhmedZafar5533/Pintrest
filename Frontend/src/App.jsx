import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage/page";

import SignupPage from "./Pages/SignUpPage/SignUpPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import { useAuthStore } from "../../Frontend/store/auth-store";
import { useEffect } from "react";
import Homepage from "./Pages/Home/Homepage";
import toast, { Toaster } from "react-hot-toast";
import { PasswordForm } from "./components/PasswordForm";
import { ProtectedLayout } from "./layout/Laayout";
import UserProfile from "./components/Profile";
import ImageViewPage from "./components/FullImageView";





const App = () => {
  const { authenticateUser, authenticationStatus } = useAuthStore();

  const getSearchParam = (queryString) => {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('login') === 'success') {
      toast.success("Login successful");
      window.history.replaceState(null, "", window.location.pathname);
    }
  };


  useEffect(() => {

    const fetchUser = async () => {
      const queryString = window.location.search;

      if (queryString) {
        getSearchParam(queryString);
      }
    };
    fetchUser();


    authenticateUser()
  }, [authenticateUser]);


  return (
    <>
      <Toaster></Toaster>

      <Router>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route index path="/" element={<Homepage />} />
            <Route path="/profile" element={<UserProfile></UserProfile>} />
            <Route path='/image/:id' element={<ImageViewPage></ImageViewPage>} />
          </Route>

          <Route
            path="/signup"
            element={!authenticationStatus ? <SignupPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!authenticationStatus ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
          <Route path="/password" element={<PasswordForm></PasswordForm>} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
