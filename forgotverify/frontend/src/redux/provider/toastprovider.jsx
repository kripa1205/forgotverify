import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  toast, ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'
import { cleartoast } from "../slice/toastslice";

const ToastProvider = ({ children }) => {
  const dispatch = useDispatch();
  const toaststate = useSelector((state) => state.toast);

  useEffect(() => {
    if (toaststate.message && toaststate.type) {
      toast[toaststate.type](toaststate.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        onClose: () => {
          dispatch(cleartoast());
        },
      });
    }
  }, [toaststate, dispatch]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
  

export default ToastProvider