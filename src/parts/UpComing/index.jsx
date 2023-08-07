import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadingUpComingFalse,
  loadingUpComingTrue,
} from "../../redux/loadingSlice";
import { POSTER_SRC } from "../../utils/posterSrc";
import { fetchPage } from "../../utils/fetchData";
import { showBrief, countPercent } from "../../utils/function";
import "./style.css";
import { Image } from "antd";

function UpComing() {
  const [data, setData] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const [points, setPoints] = useState();
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const getData = async () => {
    let i = 1;
    let currentDate = new Date();
    let json = [];
    while (json?.length < 20) {
      let data = await fetchPage(
        i,
        "/movie/upcoming?",
        "&language=en-US&page="
      );
      data?.results?.filter((item) => {
        if (new Date(item.release_date) - currentDate > 0) {
          json.push(item);
        }
      });
      i++;
    }
    //Sort date in ascending order
    json = json.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
    if (json) {
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      let pointLists = [];
      json.map((item) => {
        imgSrcArr.push(`${POSTER_SRC}` + item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`);
        pointLists.push(countPercent(item.vote_average));
      });
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
      setPoints(pointLists);
    }
  };

  useEffect(() => {
    dispatch(loadingUpComingTrue());
    getData()
      .then((res) => console.log(res))
      .then((data) => dispatch(loadingUpComingFalse()))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="trending">
      <h2 className="title pt-3 px-3 fw-bolder">Up Coming</h2>
      <div
        className="p-3 trending-film"
        ref={containerRef}
        style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
      >
        {data?.map((item, index) => (
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
                {points[index] === 0 ? (
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

export default UpComing;
