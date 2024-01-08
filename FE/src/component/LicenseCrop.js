import React, { useState } from "react";
import Card from "./UI/Card";
import Image from "./UI/Image";
import classes from "./LicenseCrop.module.css";

const LicenseCrop = (props) => {
  return (
    <div className={classes.container}>
      {props.imgCropped && (
        <Image className={classes.image} srcBase64={props.imgCropped}></Image>
      )}
    </div>
  );
};

export default LicenseCrop;
