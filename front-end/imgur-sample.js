$(function () {

    $("#search-button").click(function () {
		$.ajax( {
			url: "http://api.imgur.com/3/gallery/search/",
				headers: {
					"Authorization": "Client-ID 60a9f235e6726aa"
				},
			data: {
				'q' : $("#search-term").val()
				}
			}
		).done(function (result) {
			console.log(result)
			//img = $('<img>').attr('src', result.data.link);
			//console.log(img);
			//$("#single-image").append(img);
			//console.log(result.data.link);
			//$('#search-button').attr("disabled", true);
		});
	});

	$("#upload-button").click(function () {
		$.ajax({ 
    			url: 'https://api.imgur.com/3/upload',
    			headers: {
        			'Authorization': 'Client-ID 60a9f235e6726aa'
    			},
    			type: 'POST',
    			data: {
        		'image': 'venom.jpg'
    			}
		});
	});

	//$.ajax({
	//	url: "https://api.imgur.com/3/account/me",
	//	headers: {
	//		"Authorization": "Client-ID 60a9f235e6726aa"
	//	}
	//}).done(function (result) {
	//	console.log(result);
	//});

    $.ajax({
        url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
        headers: {
            "Authorization": "Client-ID 60a9f235e6726aa"
        }
    }).done(function (result) {
    	console.log(result.data)
    	for(i = 0; i < 9; i++){
    		img = $('<img>').attr('src', result.data[i].link);
    		console.log(img);
    		$("#pop-images").append(img);
    	}
        //console.log(result);
    });
});
