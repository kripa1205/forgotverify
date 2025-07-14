import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showtoast } from "../redux/slice/toastslice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {
    if (password !== confirm) {
      dispatch(showtoast({ message: "Passwords do not match", type: "error" }));
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        { password }
      );
      if (res.data.status) {
        dispatch(showtoast({ message: res.data.message, type: "success" }));
      } else {
        dispatch(showtoast({ message: res.data.message, type: "error" }));
      }
    } catch (error) {
      console.log(error.response?.data);
      dispatch(
        showtoast({
          message: error?.response?.data?.message || "Reset failed",
          type: "error",
        })
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control my-2"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="form-control my-2"
      />
      <button onClick={handleReset} className="btn btn-primary">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;

