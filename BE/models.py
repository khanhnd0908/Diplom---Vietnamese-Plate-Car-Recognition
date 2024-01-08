import cv2
import numpy as np
import tensorflow as tf
from keras.models import load_model
from sklearn.metrics import f1_score

from detection import segment_characters

model = load_model('weights/weight2.h5')

# Predicting the output
def fix_dimension(img):
    new_img = np.zeros((28, 28, 3))
    for i in range(3):
        new_img[:, :, i] = img
    return new_img


def show_results(croppedImg):
    dic = {}
    characters = '0123456789ABCDEFGHKLMNPRSTUVXYZ'
    for i, c in enumerate(characters):
        dic[i] = c

    output = []
    char = segment_characters(croppedImg)
    for i, ch in enumerate(char):  # iterating over the characters
        img_ = cv2.resize(ch, (28, 28), interpolation=cv2.INTER_AREA)
        img = fix_dimension(img_)
        img = img.reshape(1, 28, 28, 3)  # preparing image for the model
        y_ = model.predict(img, verbose=0)  # predicting the class
        character = dic[y_.argmax()]  #
        output.append(character)  # storing the result in a list

    plate_number = ''.join(output)

    return plate_number

