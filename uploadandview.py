from flask import render_template
import shutil
import base64
import glob
import os
import ntpath
import mysql.connector
from pip._vendor import requests

"""DATABASE DEETZ
mydb = mysql.connector.connect(
  host="localhost",
  user="enyhagen",
  password="tut4sake",
  database="vermontaholic"
)
"""


@app.route('/path/frontend.js', methods=['POST'])
# This is how we upload the photo
def uploadphoto():
    user = requests.args.post('frontendUser')
    location = requests.args.post('location')
    date = requests.args.post('frontendDate')
    photo = requests.args.post('frontendPhoto')
    comment = requests.args.post('frontendComment')

    # rename this bad boi
    photonumber = 0
    for name in glob.glob('/home/vermontaholic/photovault/*.jpg'):
        n = int(os.path.splitext(ntpath.basename(name))[0])
        if n > photonumber:
            photoname = n + 1
        if n == photonumber:
            photoname = n

    # store this bad boi
    imgdata = base64.b64decode(photo)
    filename = f'{photoname}.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    shutil.move("path/to/current/image", "path/to/new/destination/for/image")
    print("photo added to server")

    # sql this bad boi
    db = mysql.connector.connect(
        host="localhost",
        user="enyhagen",
        password="tut4sake",
        database="vermontaholic"
    )

    cursor = db.cursor()

    sql = "INSERT INTO main (user, location, date, picture, comment) VALUES (%s, %s, %s, %d, %s)"
    val = (user, location, date, photo, comment)
    db.commit()
    print(cursor.rowcount, "photo might have been uploaded.")


# This is how user can see all photos from a location
def viewphoto():
    user = requests.args.post('frontendUser')
    location = requests.args.post('location')
    photo = requests.args.post('frontendPhotoRequest')
    image = open(f'path/{photo}.txt', "r")

    db = mysql.connector.connect(
        host="localhost",
        user="enyhagen",
        password="tut4sake",
        database="vermontaholic"
    )

    cursor = db.cursor()

    cursor.execute(f"SELECT * FROM main WHERE user = '{user}' AND location = '{location}'")
    result = cursor.fetchall()
    return render_template('frontend.js', data=result)


action = requests.args.post('frontendAction')
if action == 'upload':
    uploadphoto()
if action == 'view':
    viewphoto()
