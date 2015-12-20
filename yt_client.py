from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser


#=====[ Set developer key, API service name, and current version  ]=====
DEVELOPER_KEY = "AIzaSyB5dlz_1B2MswSziCGCxmJKJ9M4Z_a9KAU"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

#=====[ Define our yt_client  ]=====
class yt_client():

	def __init__(self):
		self.yt = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    	developerKey=DEVELOPER_KEY)

	#=====[ Searches for a query term with and returns at most max_results  ]=====
	def search(self, search_term,max_results):
	 
	 	#=====[ Build and execute request ]=====
		search_response = self.yt.search().list(
			q=search_term,
			part="snippet",
			maxResults=max_results
		).execute()

		videos = []

		#=====[ Add only results that are videos  ]=====
		for search_result in search_response.get("items", []):
			if search_result["id"]["kind"] == "youtube#video":
				videos.append({'url':search_result['snippet']['thumbnails']['default']['url'],
					'title':search_result['snippet']['title'],
					'date':search_result['snippet']['publishedAt'],
					'description':search_result['snippet']['description']})

		#=====[ Print search results  ]=====
		return videos