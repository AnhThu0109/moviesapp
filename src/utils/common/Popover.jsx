import { useState } from "react";
import "./style.css";
import { Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";

export function Noti(props) {
  return (
    <div className="notiContent">
      <small>{props.notiContent}</small>
      <img
        alt=""
        className="iconNotiMess"
        src="https://cdn-icons-png.flaticon.com/512/9281/9281532.png"
      ></img>
    </div>
  );
}

export function PopoverComponent(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const logOut = () => {
    localStorage.removeItem("session_id");
    dispatch(logout());
    navigate("/");
  };
  return (
    <Popover
      content={
        props.isContent && props.content.length > 0 ? (
          props.content.map((item, index) => (
            <Noti key={index} notiContent={item} />
          ))
        ) : props.isLogout ? (
          <Link to="/" onClick={logOut} className="movieLink">
            Logout
          </Link>
        ) : (
          <div className="nonNotiContent">
            Good job! Looks like you're all caught up.
          </div>
        )
      }
      title={props.title}
      overlayClassName={props.customerCSS}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {props.object}
    </Popover>
  );
}
