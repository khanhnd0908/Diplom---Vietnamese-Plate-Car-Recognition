import React from "react";
import Card from "./UI/Card";
import Image from "./UI/Image";
import classes from "./UploadLicense.module.css";
import { useDropzone } from "react-dropzone";

const UploadLicense = (props) => {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (files) => {
      if (files.length > 0) props.onUpload(files[0]);
    },
    noKeyboard: true,
  });

  const getColor = () => {
    if (isDragAccept) {
      return "#00e676";
    }
    if (isDragReject) {
      return "#ff1744";
    }
    if (isFocused) {
      return "#2196f3";
    }
    return "#d9d9d9";
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.dropzone}`}
        style={{ ...props.style, borderColor: `${getColor()}` }}
        {...getRootProps({ isDragAccept, isFocused, isDragReject })}
      >
        {(isDragAccept || isDragReject) && (
          <Card className={classes.overlay}></Card>
        )}
        <input {...getInputProps()} />
        {!props.img && <p>[ Drag 'n' drop some files here ]</p>}

        {props.img && <Image className={classes.image} src={props.img}></Image>}
      </div>
      <button
        disabled={props.isLoading}
        type="button"
        className={`${classes.btn} ${props.isLoading ? classes.disable : ""}`}
        onClick={props.onProcess}
      >
        {props.isLoading ? "загрузка..." : "Загрузить"}
      </button>
    </div>
  );
};

export default UploadLicense;
