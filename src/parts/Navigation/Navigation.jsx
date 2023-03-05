import "./index.css";
import { Switch } from "antd";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";

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
      
      <nav className="navbar">
        <div className="container-fluid ms-2">
          <Link to="/" className="movieLink homeNav me-3">HOME</Link>
          <div>
            <ul className="navbar-nav navList">
              <li>
              <DropdownButton id="dropdownMovies" title="Movies">
                <Dropdown.Item ><Link to="/movies/popular" className="movieLink">Popular</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/movies/top" className="movieLink">Top Rated</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/movies/upcoming" className="movieLink">Up Coming</Link></Dropdown.Item>
              </DropdownButton>
              </li>
              <li>
              <DropdownButton id="dropdownMovies" title="People">
                <Dropdown.Item><Link to="/people/popular" className="movieLink">Popular People</Link></Dropdown.Item>
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
