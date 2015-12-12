(function ($) {
	// var dir = "Pictures";
	// var fileextension = [".png", ".jpg"];
	// var img = document.createElement("img");
	// var picList = [];
	// var counter = 0;
	// var j = 2
	// $.ajax({
	// 	url: dir,
	// 	success: function (data) {
	// 		//for(var i = 0; i < j; i++){
	// 			$(data).find("a:contains(" + fileextension[0] + "), a:contains(" 
	// 							+ fileextension[1] + ")").each(function () {
	// 				var filename = this.href.replace(window.location.host, "").replace("http://", "");
	// 				img.src = dir + filename;
	// 				picList.push(img.src);
	// 			});
	// 		//};
	// 		for(var i = 0; i < j; i++){
	// 			img = $('<img>').attr('src', picList[counter]).addClass("thumbnail");
	// 			$("#body").append(img);
	// 			counter++;
	// 		};
	// 	}
	// });
	function resizable(event){

		var newX = event.clientX || event.pageX || event.screenX;
		var newY = event.clientY || event.pageY || event.screenY;

		eval(event.target.id+".width=newX");
		eval(event.target.id+".height=newY");
		console.log(event);

	}
	

	$.fn.resizable = function () {
		$(".thumbnail").each(function(index, element){
			element.addEventListener("dragend", resizable, false);
			element.addEventListener("drag", resizable, false);
		})
	}

	// $(window).scroll(function() {
	// 	if(counter >= picList.length){
	// 		counter = 0;
	// 	}
 //   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
 //    		for(var i = 0; i < j; i++){
	// 			img = $('<img>').attr('src', picList[counter]).addClass("thumbnail");
	// 			$("#body").append(img);
	// 			counter++;
	// 		};
 //   		}
	// });


}(jQuery));