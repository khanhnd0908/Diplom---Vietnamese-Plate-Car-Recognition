import base64
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import uvicorn
from PIL import Image
import io
import sys
import logging
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import desc

from BE.db.database import Database
from BE.model.models import History
from models import show_results
from detection import detectPlate

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LicenseInfo(BaseModel):
    license: str
    croppedImage: str
    history: list
#
@app.post("/predict/",response_model=LicenseInfo)
async def predict(file: UploadFile = File(...)) -> any:

    if file.content_type.startswith('image/') is False:
        raise HTTPException(status_code=400, detail=f'File \'{file.filename}\' is not an image.')    

    try:
        contents = await file.read()  # type = bytes
        image = np.array(Image.open(io.BytesIO(contents)).convert('RGB')) # type = ndarray

        croppedImg = detectPlate(image) # type = ndarray

        plateNumber = show_results(croppedImg)

        _, im_arr = cv2.imencode('.jpg', croppedImg)  # im_arr: image in Numpy one-dim array format.
        im_bytes = im_arr.tobytes()
        croppedImg = base64.b64encode(im_bytes)

        database = Database()
        engine = database.get_db_connection()

        new_history = History()
        new_history.number = plateNumber


        session = database.get_db_session(engine)
        session.add(new_history)

        # get id of the inserted product
        # session.refresh(new_history)
        historyList = session.query(History).filter(
            History.number == plateNumber).order_by(desc('parked_at')).limit(5).all()

        data = []
        for i in historyList:
            data.append(i.parked_at)
            if len(data) == 5:
                break
        session.commit()
        session.close()


        return LicenseInfo(
            license= plateNumber,
            croppedImage= croppedImg,
            history = data
        )
    except Exception as error:
        logging.exception(error)
        e = sys.exc_info()[1]
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)