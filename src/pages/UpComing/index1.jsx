import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";
import { getTomorrow } from "../../utils/function";

const UpComing = () => {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState("");

  const onChange = (p) => {
    console.log(p);
    setPage(p);
  };

  const getData = async (page = 1) => {
    const tomorrow = getTomorrow();
    const json = await fetchPage(
      page,
      "/discover/movie?",
      `&language=en-US&sort_by=primary_release_date.asc&primary_release_date.gte=${tomorrow}&primary_release_date.lte=2023-12-31&page=`
    );
    if (json) {
      setData(json);
      let imgSrcArr = [];
      let detailLinkArr = [];
      json.results.map((item) => {
        item.poster_path != null
          ? imgSrcArr.push(POSTER_SRC + item.poster_path)
          : imgSrcArr.push(
              "https://img.lovepik.com/element/40021/7866.png_1200.png"
            );
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
  }, [page]);
  return (
    <>
      <div id="popular">
        <h2 className="title pt-3 px-3 fw-bolder">Up Coming Movies</h2>
        <div className="p-3 row trending-film">
          {data?.results?.map((item, index) => (
            <div className="film col-lg-3 col-sm-4 pb-2" key={index}>
              <Link to={detailLink[index]} className="movieLink">
                <Image src={imgSrc[index]} className="rounded-4" />
                <h6 className="pt-2 text-center">{item.title}</h6>
                <p className="text-center">{item.release_date}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        defaultCurrent={1}
        total={data?.total_results}
        pageSize={20}
        onChange={onChange}
        className="text-center"
        showSizeChanger={false}
      />
    </>
  );
};

export default UpComing;
