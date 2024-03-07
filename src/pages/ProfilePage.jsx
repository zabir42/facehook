import { useEffect } from "react";
import { actions } from "../actions/actions";
import MyPosts from "../components/profile/MyPost";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth, useAxios, useProfile } from "../hooks";

const ProfilePage = () => {
  const { api } = useAxios()
  const { auth } = useAuth()

  const { state, dispatch } = useProfile()
  const { loading, error } = state;

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  if (loading) {
    return <div> Fetching your Profile data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
