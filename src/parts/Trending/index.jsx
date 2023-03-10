import "./style.css";
import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { fetchData } from "../../utils/fetchData";
import { showBrief } from "../../utils/function";

function Trending() {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const [points, setPoints] = useState();
  const containerRef = useRef(null);

  const getData = async () => {
    const json = await fetchData(`${BASE_URL}/trending/movie/day?${KEY}`);
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      let pointLists = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`);
        pointLists.push(((item.vote_average / 10)*100).toFixed(0));
      })
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
      setPoints(pointLists);
    }
  }
  

  useEffect(() => {
    getData().catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="trending">
      <h2 className="title pt-3 px-3 fw-bolder">Trending</h2>
      <div className="p-3 trending-film" ref={containerRef} style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        {
          data?.results?.map((item, index) => (
            <div className="film col-3 me-4 position-relative" key={index}>
              <div>
                <Link to={detailLink[index]} className="movieLinkHome">
                <Image           
                  src={imgSrc[index]} className="rounded-4"
                />
                <h6 className="pt-2 text-center titleFilm">
                  {showBrief(item.title, 15)}
                </h6>
                <p className="text-center">{item.release_date}</p>
                </Link>
              </div>
              <div className="pointList">
                <button className="rounded-circle p-2 pointBtn text-white">
                  {points[index] == 0? (
                    <>NaN</>
                  ): (<>{points[index]}<sup>%</sup></>)}
                </button>
              </div>
            </div>
          ))
        }       
      </div>
    </div>
  );
}

export default Trending;
