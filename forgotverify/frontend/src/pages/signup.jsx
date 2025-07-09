import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showtoast } from "../redux/slice/toastslice";

const Signup = () => {
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handlesubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/newuser",
        formdata
      );
      if (res.data.status) {
        dispatch(
          showtoast({ message: "Verification email sent", type: "success" })
        );
      }
    } catch (error) {
      dispatch(showtoast({ message: "Signup failed", type: "error" }));
    }
  };

  return (
    <div>
      <input name="name" placeholder="Name" onChange={handlechange} />
      <input name="email" placeholder="Email" onChange={handlechange} />
      <input name="password" placeholder="Password" onChange={handlechange} />
      <button onClick={handlesubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;
