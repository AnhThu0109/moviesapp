import "./index.css";
import { Switch, Anchor } from "antd";
import { useState } from "react";

function Navigation() {
  const [isChangeTheme, setIsChangeTheme] = useState(true);
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
    setIsChangeTheme(value);
  };

  return (
    <div id="navigation" className={isChangeTheme === true ? "darkTheme" : "lightTheme"}>
      <Anchor
        className={isChangeTheme === true ? "darkTheme px-3" : "lightTheme px-3"}
        direction="horizontal"
        items={[
          {
            key: "home",
            href: "#home",
            title: "HOME",
            className: "navLink",
          },
          {
            key: "movie",
            href: "#movie",
            title: "Movies",
            className: "navLink",
          },
          {
            key: "actor",
            href: "#actor",
            title: "Actors",
            className: "navLink",
          },
          {
            key: "contact",
            href: "#contact",
            title: "Contact",
            className: "navLink",
          },
        ]}
      />

      <Switch className="m-3"
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
}

export default Navigation;
