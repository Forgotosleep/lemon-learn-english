import { useNavigate } from "react-router";
import ClassList from "../../components/teachers/ClassList";

export default function () {
  const navigate = useNavigate();

  function onAddClass() {
    navigate("/dashboard/class/add");
  }

  return (
    <>
      <h3 className="mb-4" style={{ float: "left" }}>
        Manage Class
      </h3>
      <button
        class="btn btn-primary me-4"
        onClick={onAddClass}
        style={{ float: "right" }}
      >
        Add New Class
      </button>
      <ClassList />
    </>
  );
}
