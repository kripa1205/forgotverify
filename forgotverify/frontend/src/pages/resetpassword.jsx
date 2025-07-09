import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showtoast } from "../redux/slice/toastslice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/resetpassword/${token}`,
        { password }
      );
      if (res.data.status) {
        dispatch(
          showtoast({ message: "Password reset successful", type: "success" })
        );
      }
    } catch {
      dispatch(showtoast({ message: "Reset failed", type: "error" }));
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
