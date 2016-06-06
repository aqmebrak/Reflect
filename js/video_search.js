


function searchMaquillageVideos(){
                gapi.client.setApiKey('AIzaSyARvwirFktEIi_BTaKcCi9Ja-m3IEJYIRk');
                gapi.client.load('youtube', 'v3', function() {
                       
					   searchVideosByQuery();
                });
}


		
function searchVideosByQuery() {
                var query = 'maquillage';
                var request = gapi.client.youtube.search.list({
                        part: 'snippet',
						maxResults: 6,
                        q : query
                });
                request.execute(function(response) {
                        // var str = JSON.stringify(response.result);
						displayVideosListInHtml(response.items);
                });
}
		
		
function displayVideosListInHtml(jsonList) {
	// console.log(jsonList);
	
	var videoList = document.getElementById("VideosList");
	console.log(videoList);
	var list = document.createElement("ul");
	
	
	for (var i = 0; i<jsonList.length; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		var img = document.createElement("img");
		
		img.setAttribute("src",jsonList[i].snippet.thumbnails.medium.url);
		//video.innerHTML = "lol";
		var description = document.createElement("div");
		description.innerHTML = "<span>"+jsonList[i].snippet.title+"</span>";
		description.innerHTML += "<span>Author : "+jsonList[i].snippet.channelTitle+"</span>";
		
		
		li.setAttribute("onclick","selectVideoFromList('"+jsonList[i].id.videoId+"')");
		
		li.appendChild(img);
		li.appendChild(description);
		
		
		list.appendChild(li);
	}
	videoList.appendChild(list);
}	

function selectVideoFromList(videoId) {
	videoID = videoId;
	console.log(videoID);
	//En profiter pour cacher la liste
	launchVideo();
	
}
		
