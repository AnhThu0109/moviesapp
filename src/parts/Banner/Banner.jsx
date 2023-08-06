import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BG_SRC } from "../../utils/bgSrc";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Banner() {
  const [bgSrc, setBgSrc] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleFormSubmit = (e, input) => {
    e.preventDefault();
    input = input.trim();
    if (input !== "") {
      navigate(`/search/${input}`);
    }
  };

  const fetchData = async (p = "/trending/movie/day?") => {
    const data = await fetch(`${BASE_URL}${p}${KEY}`);
    const json = await data.json();
    console.log("data", json);
    if (json) {
      setData(json);
      let bgSrcArr = [];
      json.results.map((item) => {
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
      });
      setBgSrc(bgSrcArr);
    }
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div id="banner" className="position-relative">
      <div id="bannerHeading">
        <h2>
          <b>Welcome.</b>
        </h2>
        <h3>
          Millions of interesting movies and actors to discover. Explore now.
        </h3>

        <form onSubmit={(e) => handleFormSubmit(e, input)}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="text-white m-2 btn-hover rounded-5 py-2 px-2">
            <b>Search</b>
          </button>
        </form>
      </div>
      <Carousel autoplay id="carousel">
        {data?.results?.map((item, index) => (
          <div key={index}>
            <img className="bannerImg" src={bgSrc[index]} alt="banner"></img>
          </div>
        ))}
      </Carousel>
      <div id="bannerColor"></div>
    </div>
  );
}

export default Banner;
