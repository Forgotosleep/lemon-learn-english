import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteMaterial,
  getMaterials,
  setMaterials,
} from "../../store/actions/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MaterialsList({ classId }) {
  const dispatch = useDispatch();
  const {
    data: materials,
    loading,
    error,
  } = useSelector((state) => state.material);

  useEffect(() => {
    setMaterials([]);
    dispatch(getMaterials(`classId=${classId}`));
  }, []);

  async function onDelete(id) {
    console.log("onDelete()");
    try {
      const result = await Swal.fire({
        title: "Delete material?",
        // text: "Delete Task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        await dispatch(deleteMaterial(id));
        dispatch(getMaterials(`classId=${classId}`));
        Swal.fire("Deleted!", "Material has been deleted.", "success");
      }
    } catch (error) {}
  }

  if (loading) return <></>;

  return (
    <>
      <div
        class="row"
        style={{
          width: "100%",
          margin: "2rem auto",
          textAlign: "left",
          // backgroundColor: "cyan",
        }}
      >
        {materials.map((material) => (
          <div class="col-3">
            <div
              key={material.id}
              class="card mt-4"
              style={{
                width: "240px",
                height: "10rem",
                cursor: "pointer",
                margin: "auto",
              }}
              //   onClick={() => onClickCard(material.id)}
            >
              <div class="card-body">
                <div class="">
                  <h5
                    class="card-title"
                    style={{
                      height: "50px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {material.name}
                  </h5>
                </div>
                <div style={{ height: "50px", overflow: "hidden" }}>
                  {material.description}
                </div>
                <div style={{ overflow: "hidden", marginTop: "10px" }}>
                  <FontAwesomeIcon
                    style={{ float: "right" }}
                    icon={faTrash}
                    onClick={() => onDelete(material.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
