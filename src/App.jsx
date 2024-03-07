import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/me" element={<ProfilePage />} exact />
        </Route>
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/register" element={<RegistrationPage />} exact />
        <Route path="*" element={<NotFoundPage />} exact />
      </Routes>
    </>
  );
};

export default App;
