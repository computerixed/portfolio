import mimetypes
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)

app.secret_key = "jewelmax"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ndi@localhost:5432/port'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__:
    app.run(host='127.0.0.1',port=3000,debug=True)
