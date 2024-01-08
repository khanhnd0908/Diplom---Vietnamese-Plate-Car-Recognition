import React, { useState } from "react";
import Card from "./UI/Card";
import classes from "./LicenseInfo.module.css";

const LicenseInfo = props => {
    return (
        <div className={classes.info}>
            <h3>Номерний знак автомобиля</h3>
            <p>{props.info}</p>
        </div>
    )
}

export default LicenseInfo;