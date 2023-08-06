import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import { showBrief } from "../../utils/function";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import { Image, Pagination } from "antd";
import { Skeleton } from "@mui/material";

function SearchPage() {
  const [searchData, setSearchData] = useState();
  const [poster, setPoster] = useState();
  const [page, setPage] = useState(1);
  const { keyword } = useParams();
  const [detailLink, setDetailLink] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchType = window.location.href.split("/").slice(-2, -1)[0];

  const onChange = (p) => {
    setPage(p);
  };

  const fetchMoviesKeyword = async (k, page = 1) => {
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

  const fetchPeopleKeyword = async (k, page = 1) => {
    const data = await fetch(
      `${BASE_URL}/search/person?${KEY}&language=en-US&query=${k}&page=${page}&include_adult=false`
    );
    let json = await data.json();
    if (json) {
      const results = json?.results?.filter(item => item.known_for_department === "Acting");
      json = {...json, results};
      setSearchData(json);
      let posterSrcArr = [];
      let detailLinkArr = [];
      json.results.map((item) => {
        item.profile_path == null
          ? posterSrcArr.push(
              "https://media.istockphoto.com/photos/icon-of-a-businessman-avatar-or-profile-pic-picture-id474001892?k=6&m=474001892&s=612x612&w=0&h=6g0M3Q3HF8_uMQpYbkM9XAAoEDym7z9leencMcC4pxo="
            )
          : posterSrcArr.push(`${POSTER_SRC}` + item.profile_path);
        detailLinkArr.push(`/people/${item.id}`);
      });
      setPoster(posterSrcArr);
      setDetailLink(detailLinkArr);
    }
  };

  const fetchData = async (k, p) => {
    debugger;
    searchType === "movies"
      ? await fetchMoviesKeyword(k, p)
      : await fetchPeopleKeyword(k, p);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(keyword, page)
      .then((data) => setIsLoading(false))
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
              <span className="fw-bolder">{searchType === "movies" ? searchData?.total_results : searchData?.results?.length}</span>{" "}
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
                  <h4>{searchType === "movies" ? item.title : item.name}</h4>
                  <p>
                    {searchType === "movies"
                      ? item.release_date
                      : "Known for " + item.known_for_department}
                  </p>
                  <br></br>
                  <p className="showBriefSearch">
                    {searchType === "movies"
                      ? showBrief(item.overview, 250)
                      : "Some movies: " +
                        item.known_for.map((item) => (" " + item.title) 
                        )}{" "}
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
