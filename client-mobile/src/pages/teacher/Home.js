import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAddClass from "../../components/teacher/ModalAddClass";
import TeacherBoxClass from "../../components/teacher/TeacherBoxClass";
import TeacherBoxHome from "../../components/teacher/TeacherBoxHome";
import { getTeacherClases, setErrorClasses, setMessageClasses } from "../../store/actions/actionClasses";
import { alertError, alertSuccess } from "../../assets/js/sweetalert2";
function Home() {
  const dispatch = useDispatch();
  const { teacherClasses: classes, messageError, messageSuccess } = useSelector((state) => state["classes"]);

  useEffect(() => {
    if (messageError) {
      alertError(messageError);
      dispatch(setErrorClasses(""));
    }
    if (messageSuccess) {
      alertSuccess(messageSuccess);
      dispatch(setMessageClasses(""));
    }
  }, [messageError, messageSuccess]);
  useEffect(() => {
    dispatch(getTeacherClases());
  }, []);
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item sm={12} xs={12}>
          <TeacherBoxHome />
        </Grid>
        <Grid item sm={12} xs={12}>
          <ModalAddClass />
        </Grid>
        {classes?.map((el) => (
          <Grid key={el.id} item style={{ display: "flex" }} item sm={4} xs={12}>
            <TeacherBoxClass data={el} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;