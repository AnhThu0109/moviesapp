import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage, fetchPageSort } from "../../utils/fetchData";
import { Dropdown, DropdownButton } from "react-bootstrap";

const TopRated = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState("");
  const [des, setDes] = useState(false);
  const [asc, setAsc] = useState(false);
  const [desRelease, setDesRelease] = useState(false);
  const [ascRelease, setAscRelease] = useState(false);
  const [aToZ, setAToZ] = useState(false);

  const onChange = (p) => {
    console.log(p);
    setPage(p);
  };

  let getData = async (page = 1) => {
    let json = await fetchPage(
      page,
      "/movie/top_rated?",
      "&language=en-US&page="
    );
    if (des === true) {
      json = await fetchPageSort(
        page,
        "/discover/movie?",
        "&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=",
        "&with_watch_monetization_types=flatrate"
      );
    }
    if (asc === true) {
      json = await fetchPageSort(
        page,
        "/discover/movie?",
        "&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=",
        "&with_watch_monetization_types=flatrate"
      );
    }
    if (desRelease === true) {
      json = await fetchPageSort(
        page,
        "/discover/movie?",
        "&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=",
        "&with_watch_monetization_types=flatrate"
      );
    }
    if (ascRelease === true) {
      json = await fetchPageSort(
        page,
        "/discover/movie?",
        "&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=",
        "&with_watch_monetization_types=flatrate"
      );
    }
    if (aToZ === true) {
      json = await fetchPageSort(
        page,
        "/discover/movie?",
        "&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=",
        "&with_watch_monetization_types=flatrate"
      );
    }
    if (json) {
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      json.results.map((item) => {
        if (item.poster_path == null) {
          imgSrcArr.push(
            "https://img.lovepik.com/element/40021/7866.png_1200.png"
          );
        } else {
          imgSrcArr.push(`${POSTER_SRC}` + item.poster_path);
        }
        detailLinkArr.push(`/movies/${item.id}`);
      });
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
    }
  };
  useEffect(() => {
    getData(page).catch((error) => {
      console.log(error);
    });
    setAsc(false);
    setDes(false);
    setDesRelease(false);
    setAscRelease(false);
    setAToZ(false);
  }, [page, des, asc, desRelease, ascRelease, aToZ]);
  return (
    <div className="px-sm-3 px-lg-5">
      <h2 className="title pt-3 fw-bolder">
        Top Rated Movies
        <img
          alt=""
          src="https://cdn-icons-png.flaticon.com/512/4090/4090434.png"
          className="titleIcon"
        ></img>
      </h2>
      <div className="row">
        <div className="col-sm-4 col-lg-3 my-3 sort ms-3 rounded-4">
          <h5>Sort</h5>
          <hr></hr>
          <DropdownButton title="Sort Results By" className="sortFilm">
            <Dropdown.Item>
              <Link onClick={() => setDes(true)}>Rating Descending</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link onClick={() => setAsc(true)}>Rating Ascending</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link onClick={() => setDesRelease(true)}>
                Release Date Descending
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link onClick={() => setAscRelease(true)}>
                Release Date Ascending
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link onClick={() => setAToZ(true)}>Title (A-Z)</Link>
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div id="popular" className="col">
          <div className="p-3 row trending-film">
            {data?.results?.map((item, index) => (
              <div className="film col-lg-3 col-sm-6 pb-2" key={index}>
                <Link to={detailLink[index]} className="movieLink">
                  <Image src={imgSrc[index]} className="rounded-4" />
                  <h6 className="pt-2 text-center">{item.title}</h6>
                  <p className="text-center">{item.release_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination
        defaultCurrent={1}
        total={10000}
        pageSize={20}
        onChange={onChange}
        className="text-center"
        showSizeChanger={false}
      />
    </div>
  );
};

export default TopRated;
