$(function () {
	var dir = "Pictures";
	var fileextension = [".png", ".jpg"];
	var img = document.createElement("img");
	var picList = [];
	var counter = 0;
	var j = 15
	$.ajax({
		url: dir,
		success: function (data) {
			//for(var i = 0; i < j; i++){
				$(data).find("a:contains(" + fileextension[0] + "), a:contains(" 
								+ fileextension[1] + ")").each(function () {
					var filename = this.href.replace(window.location.host, "").replace("http://", "");
					img.src = dir + filename;
					picList.push(img.src);
				});
			//};
			for(var i = 0; i < j; i++){
				img = $('<img>').attr('src', picList[counter]).addClass("thumbnail");
				$("#body").append(img);
				counter++;
			};
		}
	});

	$(window).scroll(function() {
		if(counter >= picList.length){
			counter = 0;
		}
   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
    		for(var i = 0; i < j; i++){
				img = $('<img>').attr('src', picList[counter]).addClass("thumbnail");
				$("#body").append(img);
				counter++;
			};
   		}
	});
}(jQuery));