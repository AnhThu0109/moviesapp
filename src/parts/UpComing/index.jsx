import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadingUpComingFalse,
  loadingUpComingTrue,
} from "../../redux/loadingSlice";
import { POSTER_SRC } from "../../utils/posterSrc";
import { fetchPage } from "../../utils/fetchData";
import { getTomorrow, showBrief } from "../../utils/function";
import "./style.css";
import { Badge, Image } from "antd";

function UpComing() {
  const [data, setData] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const getData = async () => {
    const tomorrow = getTomorrow();
    let json = await fetchPage(
      1,
      "/discover/movie?",
      `&language=en-US&sort_by=primary_release_date.asc&primary_release_date.gte=${tomorrow}&primary_release_date.lte=2023-12-31&page=`
    );
    if (json) {
      json = json.results.filter((item) => item.poster_path != null);
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      json.map((item) => {
        imgSrcArr.push(POSTER_SRC + item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`);
      });
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
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
            <Badge.Ribbon text={item.release_date} color="red">
              <div>
                <Link to={detailLink[index]} className="movieLinkHome">
                  <Image src={imgSrc[index]} className="rounded-4" />
                  <h6 className="pt-2 text-center titleFilm">
                    {showBrief(item.title, 20)}
                  </h6>
                </Link>
              </div>
            </Badge.Ribbon>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpComing;
