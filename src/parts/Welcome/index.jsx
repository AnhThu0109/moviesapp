import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Welcome() {
  const navigate = useNavigate();
  const timeOut = () => {
    setTimeout(() => navigate("/"), 8000);
  };

  useEffect(() => {
    timeOut();
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="welcomePage">
      <img
        alt=""
        src="https://i.pinimg.com/originals/e3/10/6b/e3106b678b0d99327062454871555a48.gif"
        className="pt-5"
      ></img>
      <div className="progress-bar">
        <span className="bar">
          <span className="progress"></span>
        </span>
      </div>
    </div>
  );
}
