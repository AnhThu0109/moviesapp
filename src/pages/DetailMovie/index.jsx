import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { AVATAR_SRC } from "../../utils/avatarSrc";
import { VD_SRC } from "../../utils/videoSrc";
import { fetchDataId, fetchPage } from "../../utils/fetchData";
import {
  changeMoneyFormat,
  showBrief,
  countPercent,
} from "../../utils/function";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "antd/dist/reset.css";
import { Image } from "antd";
import {
  CaretRightOutlined,
  StarFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { Skeleton } from "@mui/material";

const DetailMovie = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");
  const [typeList, setTypeList] = useState();
  const [point, setPoint] = useState();
  const [videoList, setVideoList] = useState();
  const [trailer, setTrailer] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [peopleList, setPeopleList] = useState([]);
  const [profileImg, setProfileImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalReviews, setTotalReviews] = useState();
  const [isShowReview, setShowReview] = useState(true);
  const [reviewPoint, setReviewPoint] = useState();
  const [avatarSrc, setAvatarSrc] = useState(
    "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
  );
  const [similarMovies, setSimilarMovies] = useState();
  const [posterSimilarMovies, setPosterSimilarMovies] = useState();
  const { id } = useParams();

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const getById = async (id) => {
    const json = await fetchDataId(id, "/movie/", `?${KEY}&language=en-US`);
    if (json) {
      console.log("moviedetail", json);
      setData(json);
      let imageSrc = "";
      json?.poster_path == null
        ? (imageSrc = "https://img.lovepik.com/element/40021/7866.png_1200.png")
        : (imageSrc = `${POSTER_SRC}` + json?.poster_path);
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

  const getVideoById = async (id) => {
    const json = await fetchDataId(
      id,
      "/movie/",
      `/videos?${KEY}&language=en-US`
    );
    if (json) {
      let videoListSrc = [];
      let trailerLink = "";
      json.results.map((item, index) => {
        if (index < 7) {
          videoListSrc.push(`${VD_SRC}` + item.key);
        }
        if (item.type === "Trailer") {
          trailerLink = `${VD_SRC}` + item.key;
        }
      });
      console.log(videoListSrc);
      setVideoList(videoListSrc);
      setTrailer(trailerLink);
    }
  };

  const fetchPeople = async (id) => {
    const img = [];
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?${KEY}`);
    let json = await response.json();
    if (json) {
      json = json.cast.filter((item) => item.known_for_department === "Acting" && item.profile_path != null);
      json.map((item) => img.push(`${POSTER_SRC}` + item.profile_path));
      setProfileImg(img);
      setPeopleList(json);
    }
  };

  const getReview = async (id) => {
    const data = await fetchPage(
      1,
      `/movie/${id}/reviews?`,
      "&language=en-US&"
    );
    if (data) {
      let allReviews = [];
      for (let i = 1; i <= data.total_pages; i++) {
        const response = await fetchPage(
          i,
          `/movie/${id}/reviews?`,
          "&language=en-US&"
        );
        allReviews = allReviews.concat(response?.results);
      }
      console.log("review", allReviews);
      let avatar = "";
      if (allReviews[0]?.author_details?.avatar_path != null) {
        allReviews[0]?.author_details?.avatar_path.includes("http")
          ? (avatar = allReviews[0]?.author_details?.avatar_path?.substring(1))
          : (avatar = AVATAR_SRC + allReviews[0]?.author_details?.avatar_path);
        setAvatarSrc(avatar);
      }
      if (allReviews[0]?.author_details?.rating != null) {
        let point = allReviews[0]?.author_details?.rating.toFixed(1);
        setReviewPoint(point);
      }
      setTotalReviews(allReviews);
    }
  };

  const getSimilarMovie = async (id) => {
    const json = await fetchDataId(
      id,
      "/movie/",
      `/similar?${KEY}&language=en-US&page=1`
    );
    if (json) {
      let similarMovieList = [];
      let posters = [];
      json?.results?.map((item, index) => {
        if (index < 10) {
          similarMovieList.push(item);
          item.poster_path != null
            ? posters.push(POSTER_SRC + item.poster_path)
            : posters.push(
                "https://img.lovepik.com/element/40021/7866.png_1200.png"
              );
        }
      });
      console.log("similar", similarMovieList);
      console.log("similar2", posters);
      setSimilarMovies(similarMovieList);
      setPosterSimilarMovies(posters);
    }
  };

  const getAll = async (id) => {
    setIsLoading(true);
    await fetchPeople(id);
    await getById(id);
    await getVideoById(id);
    await getReview(id);
    await getSimilarMovie(id);
    setIsLoading(false);
  };

  useEffect(() => {
    getAll(id);
  }, [id]);

  return (
    <>
      {isLoading === false ? (
        <>
          <div className="detail-film position-relative">
            <div className="detailInfo">
              <div className=" py-4 ps-lg-5 ps-sm-3 me-3">
                <Image src={imgSrc} className="posterImg rounded-4" />
              </div>

              <div className="py-4 pe-4 filmInfo text-white">
                <h1>{data?.title}</h1>
                <ul className="typeInfo">
                  <li key="1" className="dateInfo me-3">
                    {data?.release_date ? (
                      <>{data?.release_date}</>
                    ) : (
                      <>Unknown release date</>
                    )}
                  </li>
                  <li key="2" className="mx-3">
                    {typeList ? <>{typeList}</> : <>Unknown type</>}
                  </li>
                  <li key="3" className="ms-3">
                    {data?.runtime ? (
                      <>{data?.runtime} mins</>
                    ) : (
                      <>Unknown time</>
                    )}
                  </li>
                </ul>
                <button className="pointBtn rounded-circle p-2 mb-3">
                  {point}
                </button>
                <span className="voteTitle m-lg-3 m-sm-2">
                  <b>Vote Score</b>
                </span>
                <button className="ms-2 border-0 playTrailerBtn">
                  <b>
                    <a onClick={toggleModal}>
                      <CaretRightOutlined className="iconPlay" /> Play Trailer
                    </a>
                  </b>
                </button>
                <p>
                  <i>{data?.tagline}</i>
                </p>
                <h5>Overview</h5>
                <p className="overview pe-lg-5">
                  {data?.overview ? <>{data?.overview}</> : <>Unknown</>}
                </p>
              </div>
            </div>
            <div
              className="position-absolute bg-image"
              style={{ backgroundImage: `url(${bgSrc})` }}
            ></div>
            <div className="position-absolute bg-color"></div>
          </div>

          <div className="p-lg-5 p-sm-3 row billCast">
            <div className="col-9">
              <h4>Top Billed Cast</h4>
              {peopleList && peopleList?.length === 0 ? (
                <>Unknown</>
              ) : (
                <div
                  className="d-flex peopleList"
                  style={{ overflowX: "scroll" }}
                >
                  {peopleList?.map((item, index) => (
                    <div className="col-3 me-3 ms-1" key={index}>
                      <Link to={`/people/${item.id}`} className="movieLink">
                        <Image src={profileImg[index]} className="peopleImg" />
                        <h6 className="p-2 mb-3 peopleName text-center">
                          {item.name}
                          <br/>
                          <small className="text-black-50">
                            As {(item.character).split("(")[0]}
                          </small>
                        </h6>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-3 ps-lg-5 ps-sm-4">
              <h4>Status</h4>
              <p>{data?.status}</p>
              <br></br>
              <h5>Budget</h5>
              <p>
                {data?.budget === 0 ? (
                  <>Unknown</>
                ) : (
                  <>{data?.budget && changeMoneyFormat(data?.budget)}</>
                )}
              </p>
              <br></br>
              <h5>Revenue</h5>
              <p>
                {data?.revenue === 0 ? (
                  <>Unknown</>
                ) : (
                  <>{data?.revenue && changeMoneyFormat(data?.revenue)}</>
                )}
              </p>
            </div>
          </div>

          <hr></hr>
          <div className="review px-lg-5 px-sm-3 py-3">
            <ul className="titleReview">
              <li key="1" className="me-5">
                <h4>Social</h4>
              </li>
              <li key="2" className="me-5">
                <Link
                  className={
                    isShowReview === true
                      ? "socialLink text-decoration-none text-black"
                      : "text-decoration-none text-black"
                  }
                  onClick={() => setShowReview(true)}
                >
                  <h6>
                    Reviews{" "}
                    <span className="text-black-50">
                      {totalReviews?.length}
                    </span>
                  </h6>
                </Link>
              </li>
              <li key="3">
                <Link
                  className={
                    isShowReview === false
                      ? "socialLink text-decoration-none text-black"
                      : "text-decoration-none text-black"
                  }
                  onClick={() => setShowReview(false)}
                >
                  <h6>Home Page</h6>
                </Link>
              </li>
            </ul>
            <div className="showContent py-3 rounded-3 mb-3">
              {isShowReview === true ? (
                <div className="d-flex">
                  {totalReviews && totalReviews?.length > 0 ? (
                    <div className="row p-2">
                      <div className="mx-3 col-sm-2 col-lg-1">
                        <Image
                          src={avatarSrc}
                          className="rounded-circle avatarImg"
                        ></Image>
                      </div>
                      <div className="me-3 col">
                        <h5 className="firstReview">
                          A review by {totalReviews && totalReviews[0]?.author}{" "}
                          <span className="bg-black text-white rounded-3 px-2">
                            <StarFilled className="starIcon" />
                            {reviewPoint}
                          </span>
                        </h5>
                        <p className="fw-lighter text-black-50">
                          Written by{" "}
                          <b>{totalReviews && totalReviews[0]?.author}</b> on{" "}
                          {totalReviews && totalReviews[0]?.created_at}
                        </p>
                        <p className="reviewContent">
                          {totalReviews && totalReviews[0]?.content}
                        </p>
                      </div>

                      <Link
                        to={`/movies/${id}/allreviews`}
                        className="text-black text-decoration-none ps-4"
                      >
                        <b>Read All Reviews</b>
                      </Link>
                    </div>
                  ) : (
                    <div className="ms-3">
                      There is no review on this movie.
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {data?.homepage === "" ? (
                    <div className="ps-3">Unknown</div>
                  ) : (
                    <div className="ps-3">
                      <Link to={data?.homepage}>
                        <HomeOutlined className="homeIcon text-black" />
                        {data?.homepage}
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <hr></hr>
          <div className="movie px-lg-5 px-sm-3 py-3">
            <h4>Most popular videos</h4>
            {videoList?.length === 0 ? (
              <p>Unknown</p>
            ) : (
              <div
                style={{ overflowX: "scroll" }}
                className="d-flex popularVideoList"
              >
                {videoList?.map((item, index) => (
                  <iframe
                    width="350"
                    height="150"
                    src={item}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="pe-2 mb-2"
                    key={index}
                  ></iframe>
                ))}
              </div>
            )}
          </div>

          <hr></hr>
          <div className="movie px-lg-5 px-sm-3 py-3">
            <h4>Similar movies</h4>
            {similarMovies && similarMovies?.length > 0 ? (
              <div
                className="d-flex peopleList"
                style={{ overflowX: "scroll" }}
              >
                {similarMovies?.map((item, index) => (
                  <div
                    className="col-sm-4 col-lg-3 me-3 mb-2 similarMovieCol"
                    key={index}
                  >
                    <Link to={`/movies/${item.id}`}>
                      <Image
                        src={posterSimilarMovies[index]}
                        className="rounded-4 similarMovieImg"
                      ></Image>
                      <div className="d-flex justify-content-between text-black">
                        <p>{showBrief(item.title, 15)}</p>
                        <p>{countPercent(item.vote_average)}%</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <>Unknown</>
            )}
          </div>
          <div>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
              <div className="video-container text-center py-5">
                <div className="videoDetailContainer">
                  <div className="headingTrailer bg-black py-3 ps-4">
                    <h5 className="text-white">Play Trailer</h5>
                    <button
                      onClick={toggleModal}
                      className="closeBtn border-0 text-white"
                    >
                      x
                    </button>
                  </div>
                  {trailer === "" ? (
                    <h6 className="bg-black text-white pb-4 errorTrailer w-100 ps-4">
                      There is no available trailer for this movie
                    </h6>
                  ) : (
                    <iframe
                      width="560"
                      height="200"
                      src={trailer}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="videoTrailer"
                    ></iframe>
                  )}
                </div>
              </div>
            </Modal>
          </div>
        </>
      ) : (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      )}
    </>
  );
};

export default DetailMovie;
