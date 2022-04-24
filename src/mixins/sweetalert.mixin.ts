/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";

export const ToastSucess = {
  toast: true,
  position: "top-end" as "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    container: "swal-toast-container",
    popup: "swal-toast-popup-sucess",
    title: "swal-toast-title"
  }
};

export const ToastError = {
  ...ToastSucess,
  customClass: {
    container: "swal-toast-container",
    popup: "swal-toast-popup-error",
    title: "swal-toast-title"
  }
};

export const ToastForLoginAndSignUp = {
  toast: true,
  position: "top-start" as "top-start",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    popup: "swal-toast-popup-error"
  }
};
export const ConfirmMixin = {
  icon: "question" as "question",
  showCancelButton: true,
  confirmButtonText: "Xác nhận",
  cancelButtonText: "Hủy bỏ",
  showCloseButton: true,
  confirmButtonColor: "#44AB3E",
  customClass: {
    popup: "swal-confirm-popup",
    title: "swal-confirm-title"
  }
};
