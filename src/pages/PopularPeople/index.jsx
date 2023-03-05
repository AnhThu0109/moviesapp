import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";

const PopularPeople = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState("");
  const [film, setFilm] = useState();

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChange = (p) => {
    setPage(p);
  }

  const showBrief = (str) => {
    if(str.length > 35){
        const numLetters = 35;
        const shortenedStr = str.slice(0, numLetters) + "...";  
        return shortenedStr;
    } else return str;
    
  }

  const getData = async (page=1) => {
    const json = await fetchPage(page, "/person/popular?", "&language=en-US&page=")
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      let arrFilm1 = [];
      json.results.map((item, index) => {
        let arrFilm = [];
        imgSrcArr.push(`${POSTER_SRC}`+ item.profile_path);
        detailLinkArr.push(`/people/${item.id}`);
        item.known_for.map(item1 => {
            item1.name? arrFilm.push(item1.name) : arrFilm.push(item1.title);
        })
        let strFilm = arrFilm.join(", ");
        strFilm = showBrief(strFilm);
        arrFilm1.push(strFilm);
      })
      setImgSrc(imgSrcArr);
      setDetailLink(detailLinkArr);
      setDetailLink(detailLinkArr);
      setFilm(arrFilm1);
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
      <h2 className="title pt-3 px-3 fw-bolder">Popular People</h2>
      <div className="p-3 row trending-film">
      {
          data?.results?.map((item, index) => (
            <div className="col-lg-3 col-sm-4 mb-4">
            <Link to={detailLink[index]} className="movieLink">
              <Image           
                src={imgSrc[index]} 
              />
              <h6 className="peopleTitle pt-2 pb-3 text-center">{item.name}<br></br>
              <span className="fw-lighter m-2">{film[index]}</span>
              </h6>
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

export default PopularPeople;
