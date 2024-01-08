import React from "react";
import classes from "./Image.module.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const getImgSrc = (file, base64Data) => {
  return file
    ? URL.createObjectURL(file)
    : base64Data
    ? `data:image/jpeg;base64,${base64Data}`
    : "";
};

const Image = (props) => {
  return (
    <img
      className={`${classes.image} ${props.className}`}
      src={getImgSrc(props.src, props.srcBase64)}
    ></img>
  );
};

export default Image;
