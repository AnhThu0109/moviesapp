import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingPopularFalse,
  loadingPopularTrue,
} from "../../redux/loadingSlice";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { fetchPage } from "../../utils/fetchData";
import { countPercent } from "../../utils/function";
import "./style.css";
import { Image } from "antd";
import { Skeleton } from "@mui/material";

function Popular() {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [bgSrc, setBgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const containerRef = useRef(null);
  const [points, setPoints] = useState();
  const dispatch = useDispatch();

  const showBrief = (str) => {
    if (str.length > 17) {
      const numLetters = 17;
      const shortenedStr = str.slice(0, numLetters) + "...";
      return shortenedStr;
    } else return str;
  };

  const getData = async () => {
    const json = await fetchPage(1, "/movie/popular?", "&language=en-US&page=");
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let bgSrcArr = [];
      let detailLinkArr = [];
      let pointLists = [];
      json.results.map((item) => {
        imgSrcArr.push(`${POSTER_SRC}` + item.poster_path);
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
        detailLinkArr.push(`/movies/${item.id}`);
        pointLists.push(countPercent(item.vote_average));
      });
      setImgSrc(imgSrcArr);
      setBgSrc(bgSrcArr);
      setDetailLink(detailLinkArr);
      setPoints(pointLists);
    }
  };

  useEffect(() => {
    dispatch(loadingPopularTrue());
    getData()
      .then((res) => console.log(res))
      .then((data) => dispatch(loadingPopularFalse()))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="popular">
      <h2 className="title pt-3 px-3 fw-bolder">What's Popular</h2>
      <div
        className="p-3 trending-film"
        ref={containerRef}
        style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
      >
        {data?.results?.map((item, index) => (
          <div className="film col-3 me-4 position-relative" key={index}>
            <div>
              <Link to={detailLink[index]} className="movieLinkHome">
                <Image src={imgSrc[index]} className="rounded-4" />
                <h6 className="pt-2 text-center titleFilm">
                  {showBrief(item.title, 15)}
                </h6>
                <p className="text-center">{item.release_date}</p>
              </Link>
            </div>
            <div className="pointList">
              <button className="rounded-circle p-2 pointBtn text-white">
                {points[index] == 0 ? (
                  <>NaN</>
                ) : (
                  <>
                    {points[index]}
                    <sup>%</sup>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
