import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showtoast } from "../redux/slice/toastslice";
import { initiallogin, clearauth } from "../redux/slice/authslice";

const Signin = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handledata = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handlesubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", formdata);
      if (res.data.status) {
        localStorage.setItem("token", res.data.data.token);
        dispatch(initiallogin(res.data.data.data));
        dispatch(
          showtoast({ message: res.data.data.message, type: "success" })
        );
      }
    } catch (error) {
      dispatch(
        showtoast({
          message: error?.response?.data?.data?.message || "Login failed",
          type: "error",
        })
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearauth());
  };

  return (
    <div className="container mt-5">
      {auth.auth ? (
        <>
          <h2>{auth.user.name}</h2>
          <h3>{auth.user.email}</h3>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control my-2"
            value={formdata.email}
            onChange={handledata}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control my-2"
            value={formdata.password}
            onChange={handledata}
          />
          <button onClick={handlesubmit} className="btn btn-primary">
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Signin;
