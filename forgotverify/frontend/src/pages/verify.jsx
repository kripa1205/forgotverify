import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showtoast } from "../redux/slice/toastslice";
import { useDispatch } from "react-redux";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function verifyUser() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/verify/${token}`
        );
        if (res.data.status) {
          dispatch(showtoast({ message: "Email verified", type: "success" }));
          navigate("/signin");
        }
      } catch {
        dispatch(
          showtoast({ message: "Invalid or expired link", type: "error" })
        );
      }
    }

    verifyUser();
  }, []);

  return <p>Verifying...</p>;
};

export default Verify;
