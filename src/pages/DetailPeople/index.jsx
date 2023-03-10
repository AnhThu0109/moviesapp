import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Space, Spin } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { fetchDataId } from "../../utils/fetchData";
import { useParams, Link } from 'react-router-dom';
import { getYear } from "../../utils/function";

const DetailPeople = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [moviePoster, setMoviePoster] = useState([]);
  const [movieListTime, setMovieListTime] = useState([]);
  const [movieListTimeNull, setMovieListTimeNull] = useState([]);
  const [flag, setFlag] = useState(false);
  const { id } = useParams();

  const getDataById = async (id) => {
    const json = await fetchDataId(id, "/person/", `?${KEY}&language=en-US`);
    console.log("person", json);
    if (json) {
      setData(json);
      let img = `${POSTER_SRC}` + json.profile_path;
      setImgSrc(img);
    }
  };

  const getMovies = async (id) => {
    const json = await fetchDataId(id, "/person/", `/movie_credits?${KEY}&language=en-US`);
    console.log("movies", json);
    let castArr = [];
    let castArrDes = [];
    let castArrTime = [];
    let castArrTimeNull = [];
    let moviePosterArr = [];
    if (json) {
      castArr = json.cast.sort((a, b) => b.popularity - a.popularity);
      castArrTime = json.cast.sort((a, b) => getYear(b.release_date) - getYear(a.release_date));
      castArr.map((item, index) => {
        if (index < 10) {
          if(item.poster_path!= null){
            castArrDes.push(item);
            moviePosterArr.push(`${POSTER_SRC}` + item.poster_path);
          }         
        }
      });
      castArrTime.map((item, index) => {
        if (item.release_date == "") {
          castArrTime.splice(index, 1);
          castArrTimeNull.push(item);
        }
      })
      console.log("cast", castArrDes);
      setMovieListTime(castArrTime);
      setMovieListTimeNull(castArrTimeNull);
      setMovieList(castArrDes);
      setMoviePoster(moviePosterArr);
    }
  }


  useEffect(() => {
    getDataById(id).catch((error) => {
      console.log(error);
    });
    getMovies(id).catch((error) => {
      console.log(error);
    });
    function setTime() {
      setTimeout(function () {
        setFlag(true);
      }, 3000);
    }
    setTime();
    clearTimeout(setTime);
  }, []);
  return (
    <>
    { flag == true? (
      <div className="row p-lg-5 p-sm-4 detailInfo">
      <div className="col-sm-6 col-lg-4">
        <Image src={imgSrc} className="rounded-4 profileImg"></Image>
        <h4 className="fw-bolder mt-4">Personal Info</h4>
        <p><b>Known For</b><br></br>{data?.known_for_department}</p>
        <p><b>Gender</b><br></br>
          {
            data?.gender == 2 ? ("Male") : ("Female")
          }</p>
        <p><b>Birthday</b><br></br>{data?.birthday == null ? (<>Unknown</>) : (data?.birthday)}</p>
        <p><b>Place of Birth</b><br></br>{data?.place_of_birth? (<>{data?.place_of_birth}</>) : (<>Unknown</>)}</p>
        <p><b>Also Known As</b><br></br>
          {
            data?.also_known_as ? (
              <>Unknown</>
            ) : (
              data?.also_known_as?.map(item => (
                <>{item}<br></br></>
              ))
            )
          }</p>
      </div>

      <div className="col-sm-6 col-lg-8">
        <h1 className="fw-bolder">{data?.name}</h1>
        <h4 className="fw-bolder">Biology</h4>
        <p>{data?.biography? (<>{data?.biography}</>) : (<>Unknown</>)}</p>
        <br></br>
        <h4 className="fw-bolder">Known For</h4>
        {
          movieList?.length != 0 ? (
            <div className="d-flex filmList" style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
              {
                movieList?.map((item, index) => (
                  <div className="me-3" key={index}>
                    <Link to={`/movies/${item.id}`} className="movieLink">
                      <Image src={moviePoster[index]} className="imagePosterList rounded-4"></Image>
                      <p className="text-wrap text-center text-black"><b>{item.title}</b></p>
                    </Link>
                  </div>
                ))
              }
            </div>
          ) : (<>Unknown</>)
        }

        <br></br>
        {
          movieList? (
            <>
              <h4 className="fw-bolder">Acting</h4>
              <div className="movieTimeList p-3">
                {
                  movieListTimeNull ? (
                    <>
                      {
                        movieListTimeNull?.map((item, index) => (
                          <div key={index}>
                            <div>
                              None<Image src="https://cdn-icons-png.flaticon.com/128/9664/9664175.png" className="timeIcon"></Image>
                              <b>{item.title}</b>
                              {item.character == "" ? ("") : (<> as {item.character}</>)}
                            </div>
                          </div>
                        ))
                      }
                    </>
                  ) : ("")
                }
                <hr></hr>
                {
                  movieListTime ? (
                    <>
                      {
                        movieListTime?.map((item, index) => (
                          <>
                            <div key={index}>
                              {getYear(item.release_date)}<Image src="https://cdn-icons-png.flaticon.com/128/9664/9664175.png" className="timeIcon"></Image>
                              <b>{item.title}</b>
                              {item.character == "" ? ("") : (<> as {item.character}</>)}
                            </div>
                          </>
                        ))
                      }
                    </>
                  ) : ("")
                }
              </div>
            </>
          ) : ("")
        }

      </div>
    </div>
    ): (
      <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          className="text-center p-5"
        >
          <Space className="pt-5">
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        </Space>
    )}
    </>
  );
};

export default DetailPeople;
