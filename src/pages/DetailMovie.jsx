import { BASE_URL } from "../utils/api";
import { KEY } from "../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { POSTER_SRC } from "../utils/posterSrc";
import { BG_SRC } from "../utils/bgSrc";
import { VD_SRC } from "../utils/videoSrc";
import VideoPlayer from "../utils/videoPlayer";
import Modal from 'react-modal';

const DetailMovie = (id) => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");
  const [typeList, setTypeList] = useState();
  const [point, setPoint] = useState();
  const [videoList, setVideoList] = useState();
  const [trailer, setTrailer] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
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
      let types = [];
      json?.genres.map((item) => {
        types.push(item.name);
      });
      let averPoint = json?.vote_average.toFixed(2);
      setPoint(averPoint);
      setTypeList(types.join(", "));
      setImgSrc(imageSrc);
      setBgSrc(backgroundSrc);
    }
  };

  const fetchVideo = async(id) => {
    const data = await fetch(
      `${BASE_URL}/movie/${id}/videos?${KEY}&language=en-US`
    );
    const json = await data.json();
    if (json) {
      let videoListSrc = [];
      let trailerLink = "";
      json.results.map((item, index) =>{
        if(index < 2){
          videoListSrc.push( `${VD_SRC}`+ item.key);
        } 
        if(item.type == "Trailer") {
          trailerLink = `${VD_SRC}`+ item.key;
        }   
      });
      setVideoList(videoListSrc);
      setTrailer(trailerLink);
      console.log(trailerLink);
    }
  }
  useEffect(() => {
    let url = window.location.href;
    let strs = url.split('/');
    let id = strs.at(-1);
    fetchData(id).catch((error) => {
      console.log(error);
    });
    fetchVideo(id).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <div className="detail-film position-relative">
      <div className="detailInfo" >
        <div className=" py-4 ps-lg-5 ps-sm-3 me-3">
        <Image           
                src={imgSrc} className="posterImg rounded-4"
              />
        </div>
            
        <div className="py-4 pe-4 filmInfo text-white">
            <h1>{data?.title}</h1>
            <ul className="typeInfo">
              <li className="dateInfo me-3">{data?.release_date}</li>
              <li className="mx-3">
                  {typeList}
              </li>
              <li className="ms-3">{data?.runtime} mins</li>
            </ul>
            <span className="ui-widgets">
                <span className="ui-values">{point}</span>
                
            </span> 
            <span className="voteTitle m-3"><b>Vote Score</b></span>
            <button className="ms-3 border-0 playTrailerBtn"><b><a onClick={toggleModal} >Play Trailer</a></b></button>
            <p><i>{data?.tagline}</i></p>
            <h5>Overview</h5>
            <p className="overview pe-lg-5">{data?.overview}</p>
        </div>         
      </div>
      <div className="position-absolute bg-image" style={{ backgroundImage: `url(${bgSrc})`}}></div>
      <div className="position-absolute bg-color"></div>
    </div>
    <div className="movie p-5">
      <h5>Most popular videos</h5>
      {
        videoList?.map(item => (
          <VideoPlayer src={item}/> 
        ))
      } 
    </div>

    <div>
      <Modal isOpen={modalIsOpen} >
        <div className="video-container text-center py-5">
        <button onClick={toggleModal} className="closeBtn border-0">x</button>
          <iframe
            width="560"
            height="200"
            src={trailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen className="videoTrailer"
          ></iframe>
        </div>
      </Modal>
    </div>
    </>
  );
};

export default DetailMovie;
