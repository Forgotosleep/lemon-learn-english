import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterials, setMaterials } from "../../store/actions/material";

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
                height: "9rem",
                cursor: "pointer",
                margin: "auto",
              }}
              //   onClick={() => onClickCard(material.id)}
            >
              <div class="card-body">
                <div class="">
                  <h5
                    class="card-title"
                    style={{ height: "50px", textOverflow: "ellipsis" }}
                  >
                    {material.name}
                  </h5>
                </div>
                <div style={{ height: "50px", overflow: "hidden" }}>
                  {material.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
