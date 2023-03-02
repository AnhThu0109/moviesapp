import "./index.css";
import { Switch } from "antd";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Navigation() {
  const [isChangeTheme, setIsChangeTheme] = useState(true);
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
    setIsChangeTheme(value);
  };

  return (
    <div
      id="navigation"
      className={isChangeTheme === true ? "darkTheme" : "lightTheme"}
    >
      {/* <ul className={isChangeTheme === true ? "darkTheme px-3 nav" : "lightTheme px-3 nav"}>
          <li className="nav-item">
              <a class="nav-link active" href="/" aria-current="page">Home</a>
          </li>
          <li className="dropdown-menu1 nav-item">
                <a className="nav-link">Movies</a>
                <ul className="dropdown-menu1 dropdown-submenu">
                  <li>
                    <a className="dropdown-item">Popular</a>
                  </li>
                </ul>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/actors">Actors</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
          </li>
      </ul> */}
      
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand homeNav" href="/">
            HOME
          </a>
          <div>
            <ul className="navbar-nav">
              <li>
              <DropdownButton id="dropdownMovies" title="Movies">
                <Dropdown.Item href="/popular">Popular</Dropdown.Item>
                <Dropdown.Item href="/toprated">Top Rated</Dropdown.Item>
                <Dropdown.Item href="/upcomming">Up Coming</Dropdown.Item>
              </DropdownButton>
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
