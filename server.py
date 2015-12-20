#=====[ Import Flask dependencies  ]=====
from flask import Flask
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import abort
from flask import make_response
from flask import redirect

#=====[ Import Utils  ]=====
from yt_client import yt_client

#=====[ standard tools  ]=====
import sys
import os
import json
import pickle
import hashlib
import base64
from datetime import datetime
LINK_LEN = 6

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

@app.route("/save_room/<name>/<description>", methods = ['GET'])
def save_room(name, description):
	print "in save room"
	
	#=====[ Get hashed_id  ]=====
	hash_id = base64.urlsafe_b64encode(hashlib.md5(str(datetime.now())).digest())[0:LINK_LEN]

	#=====[ Update database  ]=====
	print name
	print description
	print hash_id

	return hash_id

@app.route("/room/<room_id>")
def room(room_id):
	return render_template("room.html.jinja2",room_id)

@app.route("/search")
def search():
	return render_template("search.html.jinja2")

@app.route("/search_yt/<query>", methods=["GET"])
def search_yt(query):
	results = yt.search(query, MAX_RESULTS)
	print query
	return json.dumps(results)

if __name__ == "__main__":
	app.run()