


function searchMaquillageVideos(){
                gapi.client.setApiKey('AIzaSyARvwirFktEIi_BTaKcCi9Ja-m3IEJYIRk');
                gapi.client.load('youtube', 'v3', function() {
                       
					   searchVideosByQuery('maquillage');
                });
}


		
function searchVideosByQuery(query) {
               
                var request = gapi.client.youtube.search.list({
                        part: 'snippet',
						maxResults: 6,
                        q : query
                });
                request.execute(function(response) {
                        // var str = JSON.stringify(response.result);
						displayVideosListInHtml(response.items);
						displayReturnBackButton();
                });
}
		
/* Quand on clique sur l'icone maquillage */
function displayVideosListInHtml(jsonList) {

	var videoList = document.getElementById("VideosList");
	videoList.style.display = "block";
	
	var list = document.createElement("ul");
	
	
	for (var i = 0; i<jsonList.length; i++) {
		var li = document.createElement("li");
		
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
	
	createReturnBackButton();
	document.getElementById("rightPanel").style.display = "none";
}	

/*Quand on clique sur une des videos de la liste */
function selectVideoFromList(videoId) {
	videoID = videoId;
	if (player) {
		player.loadVideoById(videoId);
	}
	launchVideo();
	document.getElementById("VideosList").style.display = "none";
	document.getElementById("rightPanel").style.display = "block";
	
	
}
	
/*Cree un bouton de retour qui ferme la liste de videos et reouvre le menu a droite */	
function createReturnBackButton() {
	
	var videoList = document.getElementById("VideosList");
	var div = document.createElement("div");
	
	div.setAttribute("id","returnBackButton");
	
	div.setAttribute("onclick","showRightPanelAndHideReturnBackButton()");
	
	videoList.appendChild(div);
}

function showRightPanelAndHideReturnBackButton() {
	var rightPanel = document.getElementById("rightPanel");
	rightPanel.style.display = "block";
	
	var returnBackButton = document.getElementById("returnBackButton");
	returnBackButton.style.display = "none";
	
	document.getElementById("VideosList").style.display = "none";
	
}




