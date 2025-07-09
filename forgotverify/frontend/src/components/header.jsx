import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/signin">Sign In</Link> |<Link to="/signup">Sign Up</Link> |
      <Link to="/forgotpassword">Forgot Password</Link>
    </nav>
  );
};

export default Header;
