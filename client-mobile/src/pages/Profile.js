import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClasses } from "../store/actions/actionClasses";
import { getUser, setUser } from "../store/actions/actionUser";
import { setScore, setScores } from "../store/actions/actionScores";
import { setTask, setTasks } from "../store/actions/actionTasks";
import { useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { fetchMyClasses } from "../store/actions/actionMyClasses";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.user);
  const { myClasses, isLoading: myClassLoading } = useSelector(
    (state) => state.myClasses
  );

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchMyClasses());
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
      <hr
        style={{
          border: "3px solid #000",
          width: "100%",
          marginTop: "20px",
        }}
      ></hr>
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#efefef",
          padding: "15px",
          width: "300px",
          borderRadius: "6px",
          textAlign: "center",
        }}
      >
        <p
          style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}
        >
          Total Enrolled class
        </p>
        <p style={{ fontWeight: "bold", fontSize: "30px" }}>
          {myClasses?.length}
        </p>
      </div>
    </>
  );
}

export default Profile;
