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
import urllib
import hashlib
import base64
from datetime import datetime
LINK_LEN = 6

#=====[ Sets up directories  ]=====
base_dir = os.path.split(os.path.realpath(__file__))[0]
static_dir = os.path.join(base_dir, 'static')

#=====[ Instantiate our youtube client  ]=====
rooms = pickle.load(open('rooms.p','rb'))
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

	#=====[ Decode parameters -- UTF-8  ]=====
	name = urllib.unquote(name).decode('utf8') 
	description = urllib.unquote(description).decode('utf8') 

	#=====[ Get unique hash_id  ]=====
	while(True):
		hash_id = base64.urlsafe_b64encode(hashlib.md5(str(datetime.now())).digest())[0:LINK_LEN]
		if hash_id not in rooms:
			break

	#=====[ Update database  ]=====
	rooms[hash_id] = {'hash_id':hash_id, 'name':name,'description':description,'songs':[],'status':'stop','location':0}
	pickle.dump(rooms, open('rooms.p','wb'))

	return hash_id

@app.route("/room/<room_id>")
def room(room_id):
	
	decoded_id = urllib.unquote(room_id).decode('utf8')
	
	#=====[ Get correct room object  ]=====
	if decoded_id in rooms:
		room = rooms[decoded_id]
		return render_template("room.html.jinja2", room=room)

	#=====[ If no room with specified ID, return error message to home screen  ]=====
	else:
		message = 'No room with id: ' + str(decoded_id)
		errors=[message]
		return render_template("index.html.jinja2", errors=errors)

@app.route("/search")
def search():
	return render_template("search.html.jinja2")

@app.route("/search_yt/<query>", methods=["GET"])
def search_yt(query):
	results = yt.search(query, MAX_RESULTS)
	print query
	return json.dumps(results)

@app.route('/view_rooms')
def view_rooms():
	string=''
	for room in rooms:
		string+= str(rooms[room]) + '\n\n'
	return string

@app.route('/add_video', methods=['POST'])
def add_video():
	
	data = request.json

	#=====[ Get room to add music to  ]=====
	room = rooms[data['room_id']]

	#=====[ Create song object  ]=====
	song = {'id':data['id'],'title':data['title'],'date':data['date'],'description':data['description']}

	room['songs'].append(song)

	return 'OK'

@app.route('/play_vid')
def play_vid():
	return render_template("play_vid.html.jinja2")

if __name__ == "__main__":
	app.run()