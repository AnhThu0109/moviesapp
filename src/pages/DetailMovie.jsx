import { BASE_URL } from "../utils/api";
import { KEY } from "../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Form, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { POSTER_SRC } from "../utils/posterSrc";
import { BG_SRC } from "../utils/bgSrc";

const DetailMovie = (id) => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");

  const bgSrcSetting = (a, b) => {
    let backgroungSrc = "";
    if(a == null){
      backgroungSrc = `${POSTER_SRC}`+ b;
    } else{ backgroungSrc = `${BG_SRC}`+ a;}
    return backgroungSrc;
  }

  const fetchData = async (id) => {
    const data = await fetch(
      `${BASE_URL}/movie/${id}?${KEY}&language=en-US`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imageSrc = `${POSTER_SRC}`+ json?.poster_path;
      let backgroundSrc = `${BG_SRC}` + json?.backdrop_path;
      setImgSrc(imageSrc);
      setBgSrc(backgroundSrc);
      console.log(bgSrc);
    }
  };
  useEffect(() => {
    let url = window.location.href;
    let strs = url.split('/');
    let id = strs.at(-1);
    fetchData(id).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <div className="detail-film position-relative">
      <div className="detailInfo" style={{ backgroundImage: `url(${bgSrc})` }}>
        <div className=" py-4 ps-4 me-3">
        <Image           
                src={imgSrc} className="posterImg rounded-4"
              />
        </div>
            
        <div className="py-4 pe-4 filmInfo text-white">
            <h1>{data?.title}</h1>
            <p>{data?.release_date} .&nbsp;
                <span>
                    {
                        data?.genres?.map(item => (
                            <>
                                {item.name}&nbsp;
                            </>
                        ))
                    }
                </span>
                .&nbsp;{data?.runtime} mins
            </p>
            <p><i>{data?.tagline}</i></p>
            <h5>Overview</h5>
            <p className="overview">{data?.overview}</p>
        </div>         
      </div>

      <div className="position-absolute bg-color"></div>
    </div>
    </>
  );
};

export default DetailMovie;
