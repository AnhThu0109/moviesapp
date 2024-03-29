import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/loginSlice";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Badge, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import { PopoverComponent } from "../../utils/common/Popover";

function Navigation() {
  const [isChangeTheme, setIsChangeTheme] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const notiExist = localStorage.getItem("noti");

  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
    setIsChangeTheme(value);
  };

  const currentAuthentication = useSelector(
    (state) => state.authentication.value
  );
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem("session_id");
    dispatch(logout());
    navigate("/");
  };

  const seeNoti = () => {
    setCount(0);
    localStorage.removeItem("noti");
  };

  return (
    <div
      id="navigation"
      className={isChangeTheme === true ? "darkTheme" : "lightTheme"}
    >
      <nav className="navbar">
        <div className="container-fluid ms-2">
          <Link to="/" className="movieLink homeNav me-3">
            <img
              alt=""
              className="logoImg"
              src="https://cdn-icons-png.flaticon.com/512/187/187902.png"
            ></img>
          </Link>
          <div>
            <ul className="navbar-nav navList">
              <li className="ms-2">
                <DropdownButton id="dropdownMovies" title="Movies">
                  <Dropdown.Item>
                    <Link to="/movies/popular" className="movieLink">
                      Popular
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/movies/top" className="movieLink">
                      Top Rated
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/movies/upcoming" className="movieLink">
                      Up Coming
                      <img
                        alt=""
                        src="https://cdn-icons-png.flaticon.com/512/2217/2217611.png"
                        className="iconImg"
                      />
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
              <li className="ms-2">
                <DropdownButton id="dropdownMovies" title="Actors">
                  <Dropdown.Item>
                    <Link to="/people/popular" className="movieLink">
                      Popular
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
              <li className="ms-4 login fw-lighter">
                {currentAuthentication === false && (
                  <>
                    <Link to="/login">Login</Link>
                    <UserOutlined className="ms-2" />
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* "/signin" */}
      <div>
        <ul className="navbar-nav navList">
          {currentAuthentication === true ? (
            <>
              <li className="ms-4 login fw-lighter text-white">
                <PopoverComponent
                  content={["Welcome to our movies website"]}
                  title="Notification"
                  customerCSS="dangerPopover"
                  isContent={true}
                  object={
                    <a onClick={seeNoti}>
                      <Badge count={notiExist ? 1 : 0} size="small">
                        <NotificationsIcon id="iconNoti"></NotificationsIcon>
                      </Badge>
                    </a>
                  }
                ></PopoverComponent>
              </li>
              <li className="ms-4 login">
                {currentAuthentication === true && (
                  <PopoverComponent
                    isLogout={true}
                    content={
                      <Link to="/" onClick={logOut} className="movieLink">
                        Logout
                      </Link>
                    }
                    title=""
                    object={
                      <Avatar
                        alt="Remy Sharp"
                        src="https://cdn-icons-png.flaticon.com/512/4322/4322991.png"
                        sx={{ width: 30, height: 30 }}
                      />
                    }
                  ></PopoverComponent>
                )}
              </li>
            </>
          ) : (
            <li className="ms-4 login fw-lighter text-white">
              <Link to="https://www.themoviedb.org/signup">Join Us</Link>
            </li>
          )}
          <li>
            <Switch
              className="m-3"
              checked={theme === "dark"}
              onChange={changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
