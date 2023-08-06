import { Image, Pagination } from "antd";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { useParams } from "react-router-dom";
import { showBrief } from "../../utils/function";
import "./style.css";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

function SearchPage() {
  const [searchData, setSearchData] = useState();
  const [poster, setPoster] = useState();
  const [page, setPage] = useState(1);
  const { keyword } = useParams();
  const [detailLink, setDetailLink] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (p) => {
    setPage(p);
  };

  const fetchKeywords = async (k, page = 1) => {
    const data = await fetch(
      `${BASE_URL}/search/movie?${KEY}&language=en-US&query=${k}&page=${page}&include_adult=false`
    );
    const json = await data.json();
    console.log("DataKey:", json);
    console.log("Num:", json.total_results);
    if (json) {
      setSearchData(json);
      let posterSrcArr = [];
      let detailLinkArr = [];
      json.results.map((item) => {
        if (item.poster_path == null) {
          posterSrcArr.push(
            "https://img.lovepik.com/element/40021/7866.png_1200.png"
          );
        } else {
          posterSrcArr.push(`${POSTER_SRC}` + item.poster_path);
        }
        detailLinkArr.push(`/movies/${item.id}`);
      });
      setPoster(posterSrcArr);
      setDetailLink(detailLinkArr);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchKeywords(keyword, page)
    .then(data => setIsLoading(false))
    .catch((e) => {
      console.log(e);
    });
  }, [page]);

  return (
    <div>
      {isLoading === true ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <>
          <div className="py-3">
            <h3 className="px-sm-3 px-lg-5 py-3">
              We found{" "}
              <span className="fw-bolder">{searchData?.total_results}</span>{" "}
              results
            </h3>
            {searchData?.results?.map((item, index) => (
              <div
                className="row px-sm-2 px-lg-5 py-3 searchResult mx-sm-2 mx-lg-5 my-3 rounded-4"
                key={index}
              >
                <div className="col-3">
                  <Image
                    className="rounded-4 imagePoster"
                    src={poster[index]}
                  />
                </div>
                <div className="col-9 mt-3">
                  <h4>{item.title}</h4>
                  <p>{item.release_date}</p>
                  <br></br>
                  <p className="showBriefSearch">
                    {showBrief(item.overview, 250)}{" "}
                    <Link to={detailLink[index]} className="movieDetailLink">
                      See Detail.
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            defaultCurrent={1}
            total={searchData?.total_results}
            pageSize={20}
            onChange={onChange}
            className="text-center"
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
}

export default SearchPage;
