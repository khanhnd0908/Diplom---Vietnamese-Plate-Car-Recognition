import React, { useState } from "react";
import classes from "./App.module.css";
import Card from "./component/UI/Card";
import UploadLicense from "./component/UploadLicense";
import LicenseCrop from "./component/LicenseCrop";
import LicenseInfo from "./component/LicenseInfo";
import LicensePack from "./component/LicensePack";
function App() {
  const [img, setImg] = useState(null);
  const [imgCropped, setImgCropped] = useState(null);

  const [info, setInfo] = useState("");
  const [history, setHistory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const uploadHandler = (file) => {
    // console.log(file);
    setImg(file);
    // reset
    setInfo("");
    setImgCropped(null);
    setHistory([]);
  };

  const processImage = () => {
    if (!img) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", img);
    fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log("data predict", data);
        setInfo(data.license);
        setImgCropped(data.croppedImage);
        setHistory(data.history);
        return data;
      })
      .catch((error) => {
        console.log("error predict", error);
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.app}>
      <div className={classes.licenseImagePart}>
        <Card
          className={classes["license-upload"]}
          style={{ background: "#0C7B93" }}
        >
          <UploadLicense
            img={img}
            isLoading={isLoading}
            onUpload={uploadHandler}
            onProcess={() => processImage()}
          ></UploadLicense>
        </Card>
        <Card
          className={classes["license-crop"]}
          style={{ background: "#0C7B93" }}
        >
          <LicenseCrop imgCropped={imgCropped}></LicenseCrop>
        </Card>
      </div>
      <div className={classes.licenseInfoPart}>
        <Card
          className={classes["info-license"]}
          style={{ background: "#0C7B93" }}
        >
          <LicenseInfo info={info} />
        </Card>
        <Card
          className={classes["info-pack"]}
          style={{ background: "#0C7B93" }}
        >
          <LicensePack infos={history} />
        </Card>
      </div>
    </div>
  );
}

export default App;
