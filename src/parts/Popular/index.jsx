import "./style.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { Image } from "antd";
import { Link } from "react-router-dom";

function Popular() {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [bgSrc, setBgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const fetchData = async (page=1) => {
    const data = await fetch(
      `${BASE_URL}/movie/popular?${KEY}&language=en-US&page=${page}`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let bgSrcArr = [];
      let detailLinkArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
        detailLinkArr.push(`/movies/${item.id}`);
      })
      setImgSrc(imgSrcArr);
      setBgSrc(bgSrcArr);
      setDetailLink(detailLinkArr);
    }
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div id="popular">
      <h2 className="title pt-3 px-3 fw-bolder">What's Popular</h2>
      <div className="p-3 row trending-film">
        {
          data?.results?.map((item, index) => (
            <div className="film col-3 pb-2">
              <Link to={detailLink[index]} className="movieLink">
              <Image           
                src={imgSrc[index]} className="rounded-4"
              />
              <h6 className="pt-2 text-center">{item.title}</h6>
              <p className="text-center">{item.release_date}</p>
              </Link>
            </div>
          ))
        }       
      </div>
    </div>
  );
}

export default Popular;
