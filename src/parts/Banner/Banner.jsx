import "./index.css";
import { Carousel, Form, Input, Tooltip, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";


function Banner() {
    const [form] = Form.useForm();
    const [input, setInput] = useState();
    const onFinish = (value) => {
        console.log(value);
        setInput(value.search);
        form.resetFields();
      };

  return (
    <div id="banner" className="position-relative">
      <Form form={form} onFinish={onFinish} id="searchForm" className="position-absolute">
          <Form.Item
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
        <Carousel autoplay>
          <div>
            <img className="bannerImg" src="https://marketplace.canva.com/EAE-xnqWvJk/1/0/1600w/canva-retro-smoke-and-round-light-desktop-wallpapers-JLofAI27pCg.jpg"></img>
          </div>
          <div>
            <img className="bannerImg" src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"></img>
          </div>
          <div>
            <img className="bannerImg" src="https://marketplace.canva.com/EAE-xnqWvJk/1/0/1600w/canva-retro-smoke-and-round-light-desktop-wallpapers-JLofAI27pCg.jpg"></img>
          </div>
          <div>
            <img className="bannerImg" src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"></img>
          </div>
        </Carousel>
      </div>
  );
}

export default Banner;