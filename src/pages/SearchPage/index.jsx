import { Image, Pagination } from "antd";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { useParams } from 'react-router-dom';
import { showBrief } from "../../utils/function";
import "./style.css";
import { Link } from "react-router-dom";


function SearchPage() {
  const [data, setData] = useState({});
  const [searchData, setSearchData] = useState();
  const [poster, setPoster] = useState();
  const [page, setPage] = useState(1);
  const { keyword } = useParams();
  const [detailLink, setDetailLink] = useState([]);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChange = (p) => {
    setPage(p);
  }

  const fetchKeywords = async (k, page=1) => {
    const data = await fetch(
      `${BASE_URL}/search/movie?${KEY}&language=en-US&query=${k}&page=${page}&include_adult=false`);
    const json = await data.json();
    console.log("DataKey:", json);
    if (json) {
      setSearchData(json);
      let posterSrcArr = [];
      let detailLinkArr = [];
      json.results.map(item => {
        posterSrcArr.push(`${POSTER_SRC}` + item.poster_path);
        detailLinkArr.push(`/movies/${item.id}`)
      })
      setPoster(posterSrcArr);   
      setDetailLink(detailLinkArr); 
    }
  }
      useEffect(() => {
        fetchKeywords(keyword, page).catch(e => {
          console.log(e);
        })
      }, [page]);

  return (
    <>
      <div className="py-3">
        {
          searchData?.results.length != 0? (
            searchData?.results.map((item, index) => (
            <div className="row px-sm-2 px-lg-5 py-3 searchResult mx-sm-2 mx-lg-5 my-3 rounded-4">
              <div className="col-3">
                <Image className="rounded-4"          
                src={poster[index]} 
                />
              </div>
              <div className="col-9 mt-3">
                <h4>{item.title}</h4>
                <p>{item.release_date}</p>
                <br></br>
                <p className="showBriefSearch">{showBrief(item.overview, 250)} <Link to={detailLink[index]} className="movieDetailLink">See Detail.</Link></p>
              </div>
            </div>
          ))
          ) : (
            <p className="text-center errorMess">There is no movie with keyword <b>{keyword}</b></p>
          )
        }
      </div>

      <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={1}
      total={10} className="text-center"
      onChange={onChange}
        />
    </>
  );
}

export default SearchPage;