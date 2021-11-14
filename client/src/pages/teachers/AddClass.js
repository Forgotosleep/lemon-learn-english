import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClass } from "../../store/actions/class";

export default function () {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    levelId: 1,
    categoryId: 1,
  });

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    dispatch(addClass(formData));
  }

  return (
    <>
      <h3 className="mb-4">Add Class</h3>
      <form style={{ width: "500px", margin: "auto" }} onSubmit={onSubmit}>
        <div class="form-group mt-4">
          {/* <label for="formGroupExampleInput">Example label</label> */}
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Class Name"
            name="name"
            onChange={onChange}
            value={formData.name}
          />
        </div>
        <div class="form-group mt-4 text-left">
          <label for="level" className="mb-3">
            Level
          </label>
          <select
            class="form-select"
            id="level"
            name="levelId"
            onChange={onChange}
            value={formData.levelId}
          >
            <option value={1}>beginner</option>
          </select>
        </div>

        <div class="form-group mt-4 text-left">
          <label for="category" className="mb-3">
            Category
          </label>
          <select
            class="form-select"
            id="category"
            name="categoryId"
            onChange={onChange}
            value={formData.categoryId}
          >
            <option value={1}>listening</option>
            <option value={2}>Speaking</option>
          </select>
        </div>

        <div class="form-group mt-5" style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-primary">
            Add Class
          </button>
        </div>
      </form>
    </>
  );
}
