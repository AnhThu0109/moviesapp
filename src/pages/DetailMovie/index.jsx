import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { VD_SRC } from "../../utils/videoSrc";
import VideoPlayer from "../../utils/videoPlayer";
import Modal from 'react-modal';
import { CaretRightOutlined } from "@ant-design/icons";

const DetailMovie = (id) => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");
  const [typeList, setTypeList] = useState();
  const [point, setPoint] = useState();
  const [videoList, setVideoList] = useState();
  const [trailer, setTrailer] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [peopleList, setPeopleList] = useState();
  const [peopleOfMovie, setPeople] = useState();
  const [profileImg, setProfileImg] = useState();

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const fetchData = async (id) => {
    const data = await fetch(
      `${BASE_URL}/movie/${id}?${KEY}&language=en-US`
    );
    const json = await data.json();
    console.log(json);
    if (json) {
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
    }
  }

  // const fetchPeople = async(index, page=1) => {
  //   const data = await fetch(
  //     `${BASE_URL}/person/popular?${id}/videos?${KEY}&language=en-US&page=${page}`
  //   );
  //   const json = await data.json();
  //   if (json) {
  //     let people = [];
  //     json.results.map((item1) =>{
  //       item1.known_for.map(item2 => {
  //         if(item2.media_type == "movie" && item2.id == index){
  //           people.push(item1);
  //         }
  //       })   
  //     });
  //     setPeopleList(people);
  //     console.log(people);
  //   }
  // }

  const findPeople = (id, arr) => {
    let people = [];
    let img = [];
    arr.map((item) => {
      item.known_for.map(item1 => {
        if(item1.id == id && item1.media_type == "movie"){
          people = people.concat(item);
        } 
      })
    })
    people.map(item => {
      img.push(`${POSTER_SRC}`+ item.profile_path)
    })
    setPeople(people);
    setProfileImg(img);
  }

  useEffect(() => {
    let url = window.location.href;
    let strs = url.split('/');
    let id = strs.at(-1);
    const fetchMovies = async () => {
      let allPeople = [];
      for (let i = 1; i <= 500; i++) {
        const response = await fetch(
          `${BASE_URL}/person/popular?${KEY}&language=en-US&page=${i}`
        );
        const json = await response.json();
        allPeople = allPeople.concat(json?.results);
      }
      console.log(allPeople);
      findPeople(id, allPeople);
      setPeopleList(allPeople);
    };
    fetchMovies();
  }, []);

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
              <li key="1" className="dateInfo me-3">{data?.release_date}</li>
              <li key="2" className="mx-3">
                  {typeList}
              </li>
              <li key="3" className="ms-3">{data?.runtime} mins</li>
            </ul>
            <button className="pointBtn rounded-circle p-2 mb-3">{point}</button>
            <span className="voteTitle m-lg-3 m-sm-2"><b>Vote Score</b></span>
            <button className="ms-3 border-0 playTrailerBtn"><b><a onClick={toggleModal} ><CaretRightOutlined className="iconPlay"/> Play Trailer</a></b></button>
            <p><i>{data?.tagline}</i></p>
            <h5>Overview</h5>
            <p className="overview pe-lg-5">{data?.overview}</p>
        </div>         
      </div>
      <div className="position-absolute bg-image" style={{ backgroundImage: `url(${bgSrc})`}}></div>
      <div className="position-absolute bg-color"></div>
    </div>

    <div className="p-lg-5 p-sm-3 row">
      <div className="col-9">
        <h5>Top Billed Cast</h5>
        <div className="d-flex peopleList" style={{ overflowX: 'scroll'}}>
        {
          peopleOfMovie?.map((item, index) => (
            <div className="col-3 me-3 ms-1">
              <Image           
                  src={profileImg[index]} className="peopleImg"
                />
                <h6 className="p-2 mb-3 peopleName text-center">{item.name}</h6>
            </div>
          ))
        }
        <div class="box" style={{ overflowX: 'scroll'}}></div>
        </div>
      </div>
      <div className="col-3 ps-lg-5 ps-sm-4">
        <h5>Status</h5>
      </div>
    </div>

    <div className="movie p-lg-5 p-sm-3">
      <h5>Most popular videos</h5>
      {/* {
        videoList?.map((item, index) => (
          <VideoPlayer key={index} src={item}/> 
        ))
      }  */}
    </div>

    <div>
      <Modal isOpen={modalIsOpen} >
        <div className="video-container text-center py-5">
          <div className="headingTrailer bg-black py-3 ps-2">
          <h5 className="text-white">Play Trailer</h5>
          <button onClick={toggleModal} className="closeBtn border-0 text-white">x</button>
          </div>
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
