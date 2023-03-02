import "./index.css";
import { Carousel, Form, Input, Tooltip, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BG_SRC } from "../../utils/bgSrc";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function Banner() {
  const [bgSrc, setBgSrc] = useState([]);
  const [form] = Form.useForm();
  const [input, setInput] = useState();
  const [data, setData] = useState({});

  const onFinish = (value) => {
    console.log(value);
    setInput(value.search);
    form.resetFields();
  };

  const fetchData = async (p = "/trending/movie/day?") => {
    const data = await fetch(
      `${BASE_URL}${p}${KEY}`
    );
    const json = await data.json();
    console.log("data", json);
    if (json) {
      setData(json);
      let bgSrcArr = [];
      json.results.map(item => {
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
      })
      setBgSrc(bgSrcArr);    
    }
  };

      useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, []);

  return (
    <div id="banner" className="position-relative">
      <div id="bannerHeading">
        <h2><b>Welcome.</b></h2>
        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
      
      <Form form={form} onFinish={onFinish} id="searchForm" className="row py-3">
          <Form.Item className="col-10"
            name="search"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="input" placeholder="Search movie..." />
          </Form.Item>
          <Tooltip title="Search">
            <Button
              id="searchBtn"
              htmlType="submit"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </Tooltip>
        </Form>
        </div>
        <Carousel autoplay id="carousel">
          {
            data?.results?.map((item, index) => (
              <div>
                <img className="bannerImg" src={bgSrc[index]}></img>
              </div>
            ))
          }
        </Carousel>
        <div id="bannerColor"></div>
      </div>
  );
}

export default Banner;