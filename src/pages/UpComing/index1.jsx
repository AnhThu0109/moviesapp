import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";

const UpComing = () => {
  const [data, setData] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);
  const [detailLink, setDetailLink] = useState("");

  const onChange = (p) => {
    console.log(p);
    setPage(p);
  };

  const getData = async (page = 1) => {
    const json = await fetchPage(
      page,
      "/movie/upcoming?",
      "&language=en-US&page="
    );
    if (json) {
      console.log(json);
      debugger;
      const result = json.results.filter(
        (a, b) => new Date(a.release_date) - new Date() > 0
      );
      setData(result);
      let imgSrcArr = [];
      let detailLinkArr = [];

      result.map((item) => {
        imgSrcArr.push(`${POSTER_SRC}` + item.poster_path);
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
          {data?.map((item, index) => (
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
