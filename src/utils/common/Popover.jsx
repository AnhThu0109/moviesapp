import { useState } from "react";
import "./style.css";
import { Popover } from "antd";

export default function PopoverComponent(props) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={props.content}
      title={props.title}
      overlayClassName={props.customerCSS}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {props.object}
    </Popover>
  );
}
