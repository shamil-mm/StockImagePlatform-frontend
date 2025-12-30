import Swal from "sweetalert2";

const defaultWidth = 400;
const defaultPadding = "0.5rem";
const defaultConfirmColor = "#d33";
const defaultCancelColor = "#3085d6";
const toastPosition = "top-end";

export const showConfirmation = async ({
  title = "Are you sure?",
  text = "",
  icon = "warning",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
}: {
  title?: string;
  text?: string;
  icon?: "warning" | "info" | "error" | "success" | "question";
  confirmButtonText?: string;
  cancelButtonText?: string;
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    width: defaultWidth,
    padding: defaultPadding,
    showCancelButton: true,
    confirmButtonColor: defaultConfirmColor,
    cancelButtonColor: defaultCancelColor,
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};

export const showSuccess = (message: string, timer = 2500) => {
  Swal.fire({
    icon: "success",
    title: message,
    timer,
    showConfirmButton: false,
    toast: true,
    position: toastPosition,
    width: defaultWidth,
    padding: defaultPadding,
  });
};

export const showError = (message: string, timer = 3000) => {
  Swal.fire({
    icon: "error",
    title: message,
    timer,
    showConfirmButton: false,
    toast: true,
    position: toastPosition,
    width: defaultWidth,
    padding: defaultPadding,
  });
};

export const showInfo = (message: string, timer = 3000) => {
  Swal.fire({
    icon: "info",
    title: message,
    timer,
    showConfirmButton: false,
    toast: true,
    position: toastPosition,
    width: defaultWidth,
    padding: defaultPadding,
  });
};
