import { BASE_URL } from "./utils/api";
import { KEY } from "./utils/key";
import { POSTER_SRC } from "./utils/posterSrc";
import { BG_SRC } from "./utils/bgSrc";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { Image, Carousel, Form, Input, Tooltip, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navigation from "./parts/Navigation/Navigation";


function App() {
  const [input, setInput] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [errorMess, setError] = useState("");
  const [imgSrc, setImgSrc] = useState([]);
  const [bgSrc, setBgSrc] = useState([]);

  const onFinish = (value) => {
    console.log(value);
    setInput(value.search);
    form.resetFields();
  };

  fetch(`${BASE_URL}/discover${KEY}&sort_by=popularity.desc`)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    })

  const fetchData = async (p = "/discover", q = "sort_by=popularity.desc") => {
    const data = await fetch(
      `${BASE_URL}${p}${KEY}&${q}`
    );
    const json = await data.json();
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let bgSrcArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
      })
      setImgSrc(imgSrcArr);
      setBgSrc(bgSrcArr);
    }
  };
  useEffect(() => {
    fetchData(input).catch((error) => {
      console.log(error);
      setError("Location is not found. Please type again!!!");
    });
  }, [input]);

  return (
    <div className="App">
      <Navigation/>

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

      <div className="p-3 row">
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
  );
}

export default App;
