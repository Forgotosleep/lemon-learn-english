import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "../../store/actions/class";
import { useParams } from "react-router-dom";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import MaterialsList from "../../components/teachers/MaterialsList";
import TasksList from "../../components/teachers/TasksList";
import AddTaskModal from "./AddTaskModal";
import AddMaterialModal from "./AddMaterialModal";
import Breadcrumb from "../../components/Breadcrumb";

export default function () {
  const dispatch = useDispatch();
  const location = useLocation();
  const [modalOpenBtn, setModalOpenBtn] = useState(null);
  const [modalMaterialOpenBtn, setModalMaterialOpenBtn] = useState(null);
  //   const [page, setPage] = useState("");
  const { id } = useParams();
  const { classDetails, loading, error } = useSelector((state) => state.class);

  // check link is selected or not
  function classLink(link) {
    let a = location.pathname.split("/");
    if (a.length === 4 && !link) return "link-pill lp-active";
    else return a[a.length - 1] === link ? "link-pill lp-active" : "link-pill";
  }

  function page() {
    let a = location.pathname.split("/");
    //   return a.length === 4 ? "" : a[a.length - 1];
    if (a[a.length - 1] === "tasks") return "Tasks";
    else if (a[a.length - 1] === "materials") return "Materials";
    return false;
  }

  function onOpenModal() {
    let p = page();
    if (p === "Tasks") {
      modalOpenBtn.click();
    } else if (p === "Materials") {
      modalMaterialOpenBtn.click();
    }
  }

  useEffect(() => {
    dispatch(getClassDetails(id));
    //   dispatch(getMaterial);
  }, []);

  if (loading) return <></>;

  return (
    <>
      <div className="container">
        <Breadcrumb />
        <h2 class="ms-2 mb-5">{classDetails.name}</h2>
        <div
          style={{
            backgroundColor: "#bababa",
            padding: "40px",
            borderRadius: "20px",
            minHeight: "600px",
            width: "1200px",
            boxSizing: "border-box",
          }}
        >
          <div class="mb-4">
            <Link to="" className={classLink("")}>
              Info
            </Link>
            <Link to="tasks" className={classLink("tasks")}>
              Tasks
            </Link>
            <Link to="materials" className={classLink("materials")}>
              Materials
            </Link>

            {/* <button class="btn btn-dark" style={{ float: "right" }}>
              Add
            </button> */}
            {page() ? (
              <button
                type="button"
                class="btn btn-secondary"
                style={{ float: "right" }}
                onClick={onOpenModal}
              >
                Create New {page()}
              </button>
            ) : (
              <></>
            )}
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#addTaskModal"
              style={{ display: "none" }}
              ref={(input) => setModalOpenBtn(input)}
            ></button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#materialModal"
              style={{ display: "none" }}
              ref={(input) => setModalMaterialOpenBtn(input)}
            ></button>

            <AddTaskModal classId={id} />
            <AddMaterialModal classId={id} />
          </div>

          <Routes>
            <Route
              path=""
              element={
                <div class="container">
                  <h2>class info</h2>
                </div>
              }
            />
            <Route path="tasks" element={<TasksList classId={id} />} />
            <Route path="materials" element={<MaterialsList classId={id} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
