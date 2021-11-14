import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/category";

export default function ({ onEdit }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function onEditClick(e, data) {
    onEdit({ id: data.id, name: data.name }, "Category");
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
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <a
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => onEditClick(e, category)}
                  >
                    Edit
                  </a>
                  <a
                    className="btn btn-danger btn-sm"
                    onClick={(e) => onDelete(e, category.id)}
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
