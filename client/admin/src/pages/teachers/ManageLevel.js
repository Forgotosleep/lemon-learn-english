import { Button, Modal } from "bootstrap"; // dont remove this, will disable the modal popup
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CategoryList from "../../components/teachers/CategoryList";
import LevelList from "../../components/teachers/LevelList";
import {
  addCategory,
  editCategory,
  getCategories,
} from "../../store/actions/category";
import { addLevel, editLevel, getLevels } from "../../store/actions/level";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [actionType, setActionType] = useState("Add");
  const [editId, setEditId] = useState(null); // data to populate edit
  const [closeBtn, setCloseBtn] = useState(null);
  const [modalOpenBtn, setModalOpenBtn] = useState(null);
  const [name, setName] = useState("");

  // popup add category
  function onAddCategory() {
    setName("");
    setType("Category");
    setActionType("Add");
  }
  function onAddLevel() {
    setName("");
    setType("Level");
    setActionType("Add");
  }

  function onEdit(data, type) {
    setEditId(data.id);
    setName(data.name);
    setType(type);
    setActionType("Edit");
    modalOpenBtn.click();
  }

  async function onClickModal(e) {
    try {
      if (actionType === "Add") {
        if (type === "Category") {
          await dispatch(addCategory({ name }));
          dispatch(getCategories());
        } else {
          await dispatch(addLevel({ name }));
          dispatch(getLevels());
        }
      } else {
        if (type === "Category") {
          await dispatch(editCategory(editId, { name }));
          dispatch(getCategories());
        } else {
          await dispatch(editLevel(editId, { name }));
          dispatch(getLevels());
        }
      }

      closeBtn.click();
    } catch (err) {
      console.log("add failed");
    }
  }

  function onChangeInput(e) {
    setName(e.target.value);
  }

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <h3 className="mb-4" style={{ float: "left" }}>
        Class Level
      </h3>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#categoryLevelModal"
        style={{ float: "right", display: "none" }}
        ref={(input) => setModalOpenBtn(input)}
      ></button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#categoryLevelModal"
        style={{ float: "right" }}
        onClick={onAddLevel}
      >
        Add Level
      </button>
      <LevelList onEdit={onEdit} />
      <div className="mt-5">
        <h3 className="mb-4" style={{ float: "left" }}>
          Class Category
        </h3>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#categoryLevelModal"
          style={{ float: "right" }}
          onClick={onAddCategory}
        >
          Add Category
        </button>

        <CategoryList onEdit={onEdit} />
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="categoryLevelModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style={{ top: "20%" }}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {actionType} {type}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" style={{ textAlign: "left" }}>
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder=""
                  onChange={onChangeInput}
                  value={name}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={(input) => setCloseBtn(input)}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                // data-bs-dismiss="modal"
                onClick={onClickModal}
              >
                {actionType}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
