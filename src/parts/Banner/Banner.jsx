import "./index.css";
import { Carousel, Form, Input, Tooltip, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";


function Banner() {
  const [bgSrc, setBgSrc] = useState([]);
    const onFinish = (value) => {
        console.log(value);
        setInput(value.search);
        form.resetFields();
      };

      const fetchData = async (p = "/discover/movie?", q = "sort_by=popularity.desc") => {
        const data = await fetch(
          `${BASE_URL}${p}${KEY}&${q}`
        );
        const json = await data.json();
        if (json) {
          let bgSrcArr = [];
          json.results.map(item => {
            bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
          })
          setBgSrc(bgSrcArr);
        }
      };
      useEffect(() => {
        fetchData(input).catch((error) => {
          console.log(error);
          setError("Movie's name is not found. Please type again!!!");
        });
      }, [input]);

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