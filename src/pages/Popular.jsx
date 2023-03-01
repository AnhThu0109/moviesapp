import { BASE_URL } from "../utils/api";
import { KEY } from "../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Form, Pagination } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { POSTER_SRC } from "../utils/posterSrc";

const PopularPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [page, setPage] = useState(1);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChange = (p) => {
    console.log(p);
    setPage(p);
  }

  const fetchData = async (page=1) => {
    const data = await fetch(
      `${BASE_URL}/movie/popular?${KEY}&language=en-US&page=${page}`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
      })
      setImgSrc(imgSrcArr);
    }
  };
  useEffect(() => {
    fetchData(page).catch((error) => {
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
            <div className="film col-3 pb-2">
              <Image           
                src={imgSrc[index]} className="rounded-4"
              />
              <h6 className="pt-2 text-center">{item.title}</h6>
              <p className="text-center">{item.release_date}</p>
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
