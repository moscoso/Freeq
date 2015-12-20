from flask import Flask
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import abort
from flask import make_response
from flask import redirect

from yt_client import yt_client

import sys
import os
import json

#=====[ Sets up directories  ]=====
base_dir = os.path.split(os.path.realpath(__file__))[0]
static_dir = os.path.join(base_dir, 'static')

#=====[ Instantiate our youtube client  ]=====
yt = yt_client()
MAX_RESULTS = 20

#=====[ Initializes app  ]=====
app = Flask(__name__, static_folder=static_dir)

#====[ Routes to home screen where user enters screen name  ]=====
@app.route("/")
def home():
    return render_template("index.html.jinja2")

@app.route("/create")
def create():
	return render_template("create.html.jinja2")

@app.route("/room")
def room():
	return render_template("room.html.jinja2")

@app.route("/search")
def search():
	return render_template("search.html.jinja2")

@app.route("/search_yt/<query>")
def search(query):
	results = yt.search(query, MAX_RESULTS)
	return json.dumps(results)

if __name__ == "__main__":
	app.run()