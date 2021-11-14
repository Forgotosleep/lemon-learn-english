import { useNavigate } from "react-router";
import ClassList from "../../components/teachers/ClassList";

export default function () {
  const navigate = useNavigate();

  function onAddClass() {
    navigate("/dashboard/class/add");
  }

  return (
    <>
      <h3 className="mb-4">Manage Class</h3>
      <button onClick={onAddClass}>Add New Class</button>
      <ClassList />
    </>
  );
}
