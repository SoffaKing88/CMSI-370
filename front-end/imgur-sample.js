$(function () {

	$.ajax({ // JD: 1
        url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
        headers: {
            "Authorization": "Client-ID 60a9f235e6726aa" // JD: 9
        }
    }).done(function (result) {
    	var j = 10 // JD: 10
    	for(var i = 0; i < j; i++){ // JD: 8, 11
    		albumLink = "http://imgur.com/a/"; // JD: 12
    		//console.log(result.data[i].link);
    		if(!((result.data[i].link).startsWith(albumLink))){ // JD: 8, 11
    			img = $('<img>').attr('src', result.data[i].link).addClass("thumbnail"); // JD: 12
    			console.log(img);
                $("#pop-images").append(img);
    		}
    		if((result.data[i].link).startsWith(albumLink)){ // JD: 8, 11
    			j++ // JD: 10
    		}
    	} // JD: 13
    	$("#pop-images").ready(function() { // JD: 14
    		$('img').each(function (){ // JD: 11
    			var currentImage = $(this);
    			currentImage.wrap("<a href='" + currentImage.attr("src") + "' </a>"); // JD: 15
    		});
    	});
    });

    $.ajax({
        url: "https://api.imgur.com/3/g/memes/",
        headers: {
            "Authorization": "Client-ID 60a9f235e6726aa" // JD: 16
        }
    }).done(function (result) {
        // JD: 17, 18
    	var j = 10
    	for(var i = 0; i < j; i++){
    		albumLink = "http://imgur.com/a/";
    		//console.log(result.data[i].link);
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
        		'Authorization': 'Client-ID 60a9f235e6726aa' // JD: 16
    		},
    		data: {
			'q' : $("#subreddit-term").val() // JD: 7
			}
		}).done(function (result) {
            // JD: 17, 18
			$("#subreddit-images").empty() // JD: 19
			var j = 10
			for(var i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				//console.log(result.data[i].link);
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
		$.ajax( { // JD: 8
			url: "https://api.imgur.com/3/gallery/search/",
				headers: {
					"Authorization": "Client-ID 60a9f235e6726aa" // JD: 16
				},
			data: {
				'q' : $("#search-term").val()
				} // JD: 7
			} // JD: 8
		).done(function (result) {
            // JD: 17, 18
			$("#search-images").empty()
			var j = 10
			for(i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				//console.log(result.data[i].link);
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
		$.ajax( { // JD: 8
			url: "https://api.imgur.com/3/gallery/random/",
				headers: { // JD: 7
					"Authorization": "Client-ID 60a9f235e6726aa" // JD: 16
				},
			} // JD: 8
		).done(function (result) {
            // JD: 17, 18
			var j = 10
			$("#random-images").empty();
			for(var i = 0; i < j; i++){
				albumLink = "http://imgur.com/a/";
				//console.log(result.data[i].link);
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

    // JD: 20
});