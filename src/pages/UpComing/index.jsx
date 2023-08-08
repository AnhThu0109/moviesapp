import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";
import {
  getDay,
  getShortMonth,
  getTomorrow,
  showBrief,
} from "../../utils/function";
import "./style.css";
import { Card, CardActionArea, CardContent } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";

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
        <div className="p-3 row trending-film justify-content-center">
          {data?.results?.map((item, index) => (
            <div
              className="film container-upComing bg-black col-lg-2 col-md-3 col-sm-6 pb-2 m-2 rounded-4"
              key={index}
            >
              <div className="row py-3 upComing rounded-4">
                <div className="col-3 pe-0">
                  <Card className="text-center">
                    <CardActionArea>
                      <CardContent className="releaseUpcoming text-white fw-bolder p-0">
                        {getShortMonth(item.release_date)}
                        <br />
                        {getDay(item.release_date)}
                      </CardContent>
                      <Link to={detailLink[index]}>
                        <InfoIcon color="primary"></InfoIcon>
                      </Link>
                    </CardActionArea>
                  </Card>
                </div>
                <div className="col-9">
                  <Link to={detailLink[index]}>
                    <Image
                      src={imgSrc[index]}
                      className="rounded-4 posterUpcoming"
                    />
                  </Link>
                </div>
              </div>
              <div className="overviewUpcoming pt-3">
                <h6 className="pt-2 text-white">{item.title}</h6>
                <small className="text-white-50">
                  {item.overview !== ""
                    ? showBrief(item.overview, 50)
                    : "There is no overview."}
                </small>
              </div>
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
