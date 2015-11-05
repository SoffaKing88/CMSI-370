$(function () {

	$.ajax({
        url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
        headers: {
            "Authorization": "Client-ID 60a9f235e6726aa"
        }
    }).done(function (result) {
    	var j = 10
    	for(var i = 0; i < j; i++){
    		albumLink = "http://imgur.com/a/";
    		console.log(result.data[i].link);
    		if(!((result.data[i].link).startsWith(albumLink))){
    			img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail");
    			$("#pop-images").append(img);
    		}
    		if((result.data[i].link).startsWith(albumLink)){
    			j++
    		}
    	}
    	$("#pop-images").ready(function() {
    		$('img').each(function (){
    			var currentImage = $(this);
    			currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>");
    		});
    	});
    });

    $.ajax({
        url: "https://api.imgur.com/3/g/memes/",
        headers: {
            "Authorization": "Client-ID 60a9f235e6726aa"
        }
    }).done(function (result) {
    	var j = 10
    	for(var i = 0; i < j; i++){
    		albumLink = "http://imgur.com/a/";
    		console.log(result.data[i].link);
    		if(!((result.data[i].link).startsWith(albumLink))){
    			image_url = result.data[i].link;
    			img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail");
    			$("#meme-images").append(img);
    		}
    		if((result.data[i].link).startsWith(albumLink)){
    			j++
    		}
    	}
    	$("#meme-images").ready(function() {
    		$('img').each(function (){
    			var currentImage = $(this);
    			currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>");
    		});
    	});
    });

    $("#subreddit-button").click(function () {
		$.ajax({ 
    		url: 'https://api.imgur.com/3/gallery/r/' + $("#subreddit-term").val(),
    		headers: {
        		'Authorization': 'Client-ID 60a9f235e6726aa'
    		},
    		data: {
			'q' : $("#subreddit-term").val()
			}
		}).done(function (result) {
			$("#subreddit-images").empty()
			var j = 10
			for(var i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				console.log(result.data[i].link);
				if(!((result.data[i].link).startsWith(albumLink))){
					img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail");
					$("#subreddit-images").append(img);
				}
				if((result.data[i].link).startsWith(albumLink)){
					j++
				}
			}

			$("#subreddit-images").ready(function() {
    			$('img').each(function (){
    				var currentImage = $(this);
    				currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>");
    			});
    		});
		});
	});

    $("#search-button").click(function () {
		$.ajax( {
			url: "https://api.imgur.com/3/gallery/search/",
				headers: {
					"Authorization": "Client-ID 60a9f235e6726aa"
				},
			data: {
				'q' : $("#search-term").val()
				}
			}
		).done(function (result) {
			$("#search-images").empty()
			var j = 10
			for(i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				console.log(result.data[i].link);
				if(!((result.data[i].link).startsWith(albumLink))){
					img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail");
					$("#search-images").append(img);
				}
				if((result.data[i].link).startsWith(albumLink)){
					j++
				}
			}

			$("#search-images").ready(function() {
    			$('img').each(function (){
    				var currentImage = $(this);
    				currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>");
    			});
    		});
		});
	});

	$("#random-button").click(function () {
		$.ajax( {
			url: "https://api.imgur.com/3/gallery/random/",
				headers: {
					"Authorization": "Client-ID 60a9f235e6726aa"
				},
			}
		).done(function (result) {
			var j = 10
			$("#random-images").empty();
			for(var i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				console.log(result.data[i].link);
				if(!((result.data[i].link).startsWith(albumLink))){
					img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail");
					$("#random-images").append(img);
				}
				if((result.data[i].link).startsWith(albumLink)){
					j++
				}
			}

			$("#random-images").ready(function() {
    			$('img').each(function (){
    				var currentImage = $(this);
    				currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>");
    			});
    		});
		});
	});

});