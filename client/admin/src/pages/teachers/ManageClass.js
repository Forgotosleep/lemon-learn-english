import { useNavigate } from "react-router";
import Breadcrumb from "../../components/Breadcrumb";
import ClassList from "../../components/teachers/ClassList";

export default function () {
  const navigate = useNavigate();

  function onAddClass() {
    navigate("/dashboard/class/add");
  }

  return (
    <>
      <div class="" style={{ overflow: "hidden", marginTop: "36px" }}>
        <h2 className="ms-3 mb-4" style={{ float: "left" }}>
          Classes
        </h2>
        <button
          class="btn btn-primary me-4"
          onClick={onAddClass}
          style={{ float: "right" }}
        >
          Add New Class
        </button>
      </div>
      <ClassList />
    </>
  );
}
