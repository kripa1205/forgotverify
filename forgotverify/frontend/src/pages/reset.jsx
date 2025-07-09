import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      navigate(`/resetpassword/${token}`);
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default Reset;
