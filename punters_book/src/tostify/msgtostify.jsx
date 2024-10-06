import { Bounce, toast } from "react-toastify";
const tostifyConfig = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const notifySuccess = () => {
  toast.success("Success", tostifyConfig);
};

export const notifyError = () => {
  toast.error("You have rejected", tostifyConfig);
};
