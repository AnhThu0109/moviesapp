import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Form, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TopRated = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState("");

  const onChange = (p) => {
    console.log(p);
    setPage(p);
  }

  const getData = async (page=1) => {
    const json = await fetchPage(page, "/movie/top_rated?", "&language=en-US&page=")
    if (json) {
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`)
      })
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
    }
  }
  useEffect(() => {
    getData(page).catch((error) => {
      console.log(error);
    });
  }, [page]);
  return (
    <div className="px-sm-3 px-lg-5">
      <h2 className="title pt-3 fw-bolder">Top Rated Movies</h2>
      <div className="row">
    <div className="col-sm-4 col-lg-3 my-3 sort ms-3 rounded-4">
      <h5>Sort</h5>
      <hr></hr>
      <DropdownButton title="Sort Results By" className="sortFilm">
        <Dropdown.Item><Link to="/movies/popular/des">Popular Descending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/popular/asc">Popular Ascending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/top/desc">Rating Descending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/top/asc">Rating Ascending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/popular">Release Date Descending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/popular">Release Date Ascending</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/movies/popular">Title (A-Z)</Link></Dropdown.Item>
      </DropdownButton>
    </div>
      <div id="popular" className="col">
      <div className="p-3 row trending-film">
        {
          data?.results?.map((item, index) => (
            <div className="film col-lg-3 col-sm-4 pb-2">
            <Link to={detailLink[index]} className="movieLink">
              <Image           
                src={imgSrc[index]} className="rounded-4" 
              />
              <h6 className="pt-2 text-center">{item.title}</h6>
              <p className="text-center">{item.release_date}</p>
            </Link>
            </div>
          ))
        }       
      </div>
    </div>
    </div>

    <Pagination 
        defaultCurrent={1}
        total={data?.total_results}
        pageSize={20}
        onChange={onChange} className="text-center"
        />
    </div>
  );
};

export default TopRated;
