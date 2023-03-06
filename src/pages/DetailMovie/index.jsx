import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Alert, Space, Spin } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { VD_SRC } from "../../utils/videoSrc";
import VideoPlayer from "../../utils/videoPlayer";
import Modal from 'react-modal';
import { CaretRightOutlined } from "@ant-design/icons";
import { fetchDataId, fetchPage } from "../../utils/fetchData";
import { changeMoneyFormat, getId } from "../../utils/function";

const DetailMovie = () => {
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
  const [flag, setFlag] = useState(false);
  const [totalReviews, setTotalReviews] = useState();

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const getById = async(id) => {
    const json = await fetchDataId(id, "/movie/", `?${KEY}&language=en-US`)
    if (json) {
      console.log("Detail Movie:",json);
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
  }

  const getVideoById = async(id) => {
    const json = await fetchDataId(id, "/movie/", `/videos?${KEY}&language=en-US`);
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
    console.log(people);
    setPeople(people);
    setProfileImg(img);
  }

  const fetchPeople = async (id) => {
    let allPeople = [];
    for (let i = 1; i <= 500; i++) {
      const response = await fetch(
        `${BASE_URL}/person/popular?${KEY}&language=en-US&page=${i}`
      );
      const json = await response.json();
      allPeople = allPeople.concat(json?.results);
    }
    findPeople(id, allPeople);
    setPeopleList(allPeople);
  };

  const getReview = async(id) => {
    const data = await fetchPage(1, `/movie/${id}/reviews?`, "&language=en-US&");
    if(data){
      let allReviews = [];
      for (let i=1; i<= data.total_pages; i++){
        const response = await fetchPage(i, `/movie/${id}/reviews?`, "&language=en-US&");
        const review = await response.json();
        allReviews = allReviews.concat(review?.results);
      }
      console.log("review", allReviews);
      setTotalReviews(allReviews);
    }
  }

  const getAll = async(id) => {
    await fetchPeople(id);
    await getById(id);
    await getVideoById(id); 
    //await getReview(id); 
  }

  useEffect(() => {
    let id = getId();
    function setTime(){
      setTimeout(function () {setFlag(true)}, 5000);
    }
    setTime();
    clearTimeout(setTime);
    getAll(id);  
  }, []);
  return (
    <>
      {
      flag? (
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
        {/* {
          peopleOfMovie?.length == 0 ? () : ()
        } */}
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
        <div className="box" style={{ overflowX: 'scroll'}}></div>
        </div>
      </div>
      <div className="col-3 ps-lg-5 ps-sm-4">
        <h5>Status</h5>
        <p>{data?.status}</p><br></br>
        <h5>Budget</h5>
        <p>
          {
          (data?.budget == 0)? (<>Unknown</>) : (<>{changeMoneyFormat(data?.budget)}</>)
          }
        </p><br></br>
        <h5>Revenue</h5>
        <p>
          {
          (data?.revenue == 0)? (<>Unknown</>) : (<>{changeMoneyFormat(data?.revenue)}</>)
          }
        </p>
      </div>
    </div>

    <hr></hr>

    <div className="review px-lg-5 px-sm-3 py-3">
      <ul className="titleReview">
        <li key="1" className="me-5"><h5>Social</h5></li>
        <li key="2" className="me-5">
          <h6>Reviews</h6>
          {

          }
        </li>
        <li key="3"><h6>Home Page</h6></li>
      </ul>
      
    </div>

    <hr></hr>
    <div className="movie px-lg-5 px-sm-3 py-3">
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
          <div className="videoDetailContainer">
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
        </div>
      </Modal>
    </div>
    </>
      ) : (
        <Space
    direction="vertical"
    style={{
      width: '100%',
    }} className="text-center p-5"
  >
    <Space className="pt-5">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
  </Space>
      )
      }
    </>
    
  );
};

export default DetailMovie;
