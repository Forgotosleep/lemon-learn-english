import { Navigate } from "react-router-dom";
import SongSearch from "../pages/SongSearch";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const SearchSongGuard = () => {
  console.log("searchsong");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Navigate to="/login" /> : <SongSearch />}</>;
};

export default SearchSongGuard;
