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

  const fetchData = async (id) => {
    const data = await fetch(
      `${BASE_URL}/movie/${id}?${KEY}&language=en-US`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imageSrc = `${POSTER_SRC}`+ json?.poster_path;
      let backgroundSrc = `${BG_SRC}`+ json?.backdrop_path;
      setImgSrc(imageSrc);
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
      <div id="popular">
      <h2 className="title pt-3 px-3 fw-bolder">Detail</h2>
      <div className="p-3 row trending-film" style="background-img: {}">
            <Image           
                src={imgSrc} className="rounded-4"
              />     
      </div>
    </div>
    </>
  );
};

export default DetailMovie;
