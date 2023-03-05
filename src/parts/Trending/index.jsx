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
  const containerRef = useRef(null);

  const getData = async () => {
    const json = await fetchData(`${BASE_URL}/trending/movie/day?${KEY}`);
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`);
      })
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
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
            <div className="film col-3 me-3">
              <Link to={detailLink[index]} className="movieLink">
              <Image           
                src={imgSrc[index]} className="rounded-4"
              />
              <h6 className="pt-2 text-center titleFilm">
                {showBrief(item.title, 15)}
              </h6>
              <p className="text-center">{item.release_date}</p>
              </Link>
            </div>
          ))
        }       
      </div>
    </div>
  );
}

export default Trending;
