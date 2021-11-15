import Swal from "sweetalert2";

export function alertSuccess(text) {
  Swal.fire({
    title: text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}

export function alertError(text) {
  Swal.fire({
    title: text,
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
  });
}

export async function alertSure() {
  const result = await Swal.fire({
    title: "Are you Sure ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sure",
  });
  return result;
}
