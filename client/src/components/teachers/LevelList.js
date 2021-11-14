import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevels } from "../../store/actions/level";

export default function ({ onEdit }) {
  const dispatch = useDispatch();
  const { data: levels, loading, error } = useSelector((state) => state.level);

  useEffect(() => {
    dispatch(getLevels());
  }, []);

  function onEditClick(e, data) {
    onEdit({ id: data.id, name: data.name }, "Level");
  }

  function onDelete(e, id) {}

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            levels.map((lvl) => (
              <tr key={lvl.id}>
                <td>{lvl.name}</td>
                <td>
                  <a
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => onEditClick(e, lvl)}
                  >
                    Edit
                  </a>
                  <a
                    className="btn btn-danger btn-sm"
                    onClick={(e) => onDelete(e, lvl.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}
