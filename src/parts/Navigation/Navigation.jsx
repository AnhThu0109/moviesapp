import "./index.css";
import { Switch, Anchor } from "antd";
import { useState } from "react";


function Navigation() {
    const [theme, setTheme] = useState("dark");
    const changeTheme = (value) => {
        setTheme(value ? "dark" : "light");
    };

  return (
    <div id="navigation" className="p-3">
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      <Anchor
        theme={theme}
        direction="horizontal"
        items={[
          {
            key: 'home',
            href: '#home',
            title: 'HOME',
            className: 'navLink',
          },
          {
            key: 'movie',
            href: '#movie',
            title: 'Movies',
            className: 'navLink',
          },
          {
            key: 'actor',
            href: '#actor',
            title: 'Actors',
            className: 'navLink',
          },
          {
            key: 'contact',
            href: '#contact',
            title: 'Contact',
            className: 'navLink',
          },
        ]}
      />
      </div>
  );
}

export default Navigation;