import "./index.css";
import { Switch } from "antd";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HOME
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown" key="1">
                <a
                  className="nav-link dropdown-toggle"
                  href="/popular"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Movies
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li key="2">
                    <a className="dropdown-item" href="#">
                      Popular
                    </a>
                  </li>
                  <li key="3">
                    <a className="dropdown-item" href="#">
                      Trending
                    </a>
                  </li>
                  <li key="4">
                    <a className="dropdown-item" href="#">
                      Top Rated
                    </a>
                  </li>
                </ul>
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
