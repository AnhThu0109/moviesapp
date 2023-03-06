import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Form, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";

const PopularPage = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState([]);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChange = (p) => {
    setPage(p);
  }

  const getData = async (page=1) => {
    const json = await fetchPage(page, "/movie/popular?", "&language=en-US&page=")
    if (json) {
      console.log(json);
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
    <>
      <div id="popular">
      <h2 className="title pt-3 px-3 fw-bolder">Popular Movies</h2>
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

      <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={1}
      total={500} className="text-center"
      onChange={onChange}
        />
    </>
  );
};

export default PopularPage;
