import "./style.css";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

function Navigation() {
  const [isChangeTheme, setIsChangeTheme] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [session, setSession] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
    setIsChangeTheme(value);
  };
  const s = localStorage.getItem("session_id");

  const userLog = () => {
    let user = "";
    if(s == "undefined" || s == null) {
      user = "Login";
      setText(user);
    } else {
      user = "Logout";
      setText(user);
    }
  }

  const logOut = () => {
    localStorage.removeItem('session_id');
    setSession("");
    navigate("/");
  }

  useEffect(() => {
    userLog();
    setSession(s);
  }, [session])

  return (
    <div
      id="navigation"
      className={isChangeTheme === true ? "darkTheme" : "lightTheme"}
    >
      
      <nav className="navbar">
        <div className="container-fluid ms-2">
          <Link to="/" className="movieLink homeNav me-3">HOME</Link>
          <div>
            <ul className="navbar-nav navList">
              <li className="ms-2">
              <DropdownButton id="dropdownMovies" title="Movies">
                <Dropdown.Item ><Link to="/movies/popular" className="movieLink">Popular</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/movies/top" className="movieLink">Top Rated</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/movies/upcoming" className="movieLink">Up Coming</Link></Dropdown.Item>
              </DropdownButton>
              </li>
              <li className="ms-2">
              <DropdownButton id="dropdownMovies" title="People">
                <Dropdown.Item><Link to="/people/popular" className="movieLink">Popular People</Link></Dropdown.Item>
                  </DropdownButton>
              </li>
              <li className="ms-4 login fw-lighter">
                {
                  (session != "undefined" && s != null)? (
                    <Link to="/" onClick={() => {logOut()}}>Logout</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )
                }                 
                <UserOutlined className="ms-2"/>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch
        className="m-3"
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
}

export default Navigation;
