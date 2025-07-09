import { useState } from "react";
import axios from "axios";
import { showtoast } from "../redux/slice/toastslice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");

  const handlesubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgotpassword", {
        email,
      });
      if (res.data.status) {
        dispatch(
          showtoast({ message: "Reset link sent to email", type: "success" })
        );
      }
    } catch (err) {
      dispatch(showtoast({ message: "Something went wrong", type: "error" }));
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setemail(e.target.value)}
      />
      <button onClick={handlesubmit}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;
