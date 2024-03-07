import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";


import { useAuth } from "../hooks";
import PostProvider from "../provider/PostProvider";
import { ProfileProvider } from "../provider/ProfileProvider";

function PrivateRoute() {
  const navigate = useNavigate();
  const { auth } = useAuth()

  useEffect(() => {
    if (!auth.authToken) {
      navigate("/login");
    }
  }, [auth.authToken, navigate]);

  return auth.user ? (
    <>
      <PostProvider>
        <ProfileProvider>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </ProfileProvider>
      </PostProvider>
    </>
  ) : null;
}

export default PrivateRoute;
