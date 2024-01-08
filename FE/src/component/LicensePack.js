import React from "react";
import classes from "./LicensePack.module.css";

const LicensePack = (props) => {
  return (
    <div className={classes.container}>
      <h3>История парковки</h3>
      {props.infos?.map((info) => {
        return <p>{info}</p>;
      })}
    </div>
  );
};

export default LicensePack;
