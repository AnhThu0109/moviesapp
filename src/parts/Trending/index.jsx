import "./style.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { Image } from "antd";

function Trending() {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);

  const fetchData = async (p = "/trending/all/day?") => {
    const data = await fetch(
      `${BASE_URL}${p}${KEY}`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
      })
      setImgSrc(imgSrcArr);
    }
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div id="trending">
      <h2 className="title pt-3 px-3 fw-bolder">Trending</h2>
      <div className="p-3 row trending-film">
        {
          data?.results?.map((item, index) => (
            <div className="film col-3 pb-2">
              <Image           
                src={imgSrc[index]} className="rounded-4"
              />
              <h6 className="pt-2 text-center">{item.title}</h6>
              <p className="text-center">{item.release_date}</p>
            </div>
          ))
        }       
      </div>
    </div>
  );
}

export default Trending;
