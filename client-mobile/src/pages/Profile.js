import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClasses } from "../store/actions/actionClasses";
import { getUser, setUser } from "../store/actions/actionUser";
import { setScore, setScores } from "../store/actions/actionScores";
import { setTask, setTasks } from "../store/actions/actionTasks";
import { useEffect } from "react";
import { Avatar, Button } from "@mui/material";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const logout = () => {
    dispatch(setUser({}));
    dispatch(setClasses([]));

    dispatch(setTask({}));
    dispatch(setTasks([]));

    dispatch(setScore({}));
    dispatch(setScores([]));

    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          src={user.photo}
          sx={{ width: 150, height: 150 }}
          variant="rounded"
        ></Avatar>
        <div>
          <h1 style={{ paddingTop: "10px", paddingLeft: "30px" }}>
            {user.username}
          </h1>
          <p
            style={{ padding: "6px 30px", fontSize: "22px", color: "#898183" }}
          >
            {user.role}
          </p>
        </div>
        {/* <p>{JSON.stringify(user)}</p>
         */}

        {/* <Button
          variant="contained"
          color="primary"
          onClick={logout}
          style={{ marginLeft: "auto", padding: "10px" }}
        >
          Logout
        </Button> */}
      </div>
      <div style={{ display: "flex" }}>
        <p>Total enrolled class</p>
        <p></p>
      </div>
    </>
  );
}

export default Profile;
