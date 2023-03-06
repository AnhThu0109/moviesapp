import "./style.css";
import { Carousel, Form, Input, Tooltip, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BG_SRC } from "../../utils/bgSrc";
import { BASE_URL } from "../../utils/api";
import { KEY } from "../../utils/key";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { POSTER_SRC } from "../../utils/posterSrc";
import { useNavigate } from 'react-router-dom';


function Banner() {
  const [bgSrc, setBgSrc] = useState([]);
  const [form] = Form.useForm();
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [searchData, setSearchData] = useState();
  const [poster, setPoster] = useState();
  const navigate = useNavigate();

  const handleFormSubmit = (e, input) => {
    e.preventDefault();
    input = input.trim();
    if(input != ""){
      navigate(`/search/${input}`);
    }
}

  const fetchKeywords = async (keyword, page=1) => {
    const data = await fetch(
      `${BASE_URL}/search/movie?${KEY}&language=en-US&query=${keyword}&page=${page}&include_adult=false`);
    const json = await data.json();
    console.log("DataKey:", json);
    if (json) {
      setSearchData(json);
      let posterSrcArr = [];
      json.results.map(item => {
        posterSrcArr.push(`${POSTER_SRC}` + item.poster_path);
      })
      setPoster(posterSrcArr);    
    }
  }
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
      
        <form className='text-center' onSubmit={(e) => handleFormSubmit(e, input)} action="/search">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className='m-2 btn btn-info rounded-circle'>Search</button>
        </form>

      {/* <Form form={form} onFinish={onFinish} id="searchForm" className="row py-3" action="https://example.com/api/formdata" method="POST">
          <Form.Item className="col-10"
            name="search"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="input" placeholder="Search movie..." name="keyword"/>
          </Form.Item>
          <Form.Item>
          {/* <Tooltip title="Search">
            <Button
              id="searchBtn"
              htmlType="submit"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </Tooltip> */}
          {/* <Button type="primary" htmlType="submit">
          Submit
        </Button>
          </Form.Item>
        </Form> */} 
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