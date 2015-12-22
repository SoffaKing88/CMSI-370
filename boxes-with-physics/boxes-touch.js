(function ($) {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });

                touch.target.touching = true;
                touch.target.velocity.x = touch.pageX - touch.target.lastX;
                touch.target.velocity.y = touch.pageY - touch.target.lastY;
                touch.target.lastX = touch.pageX;
                touch.target.lastY = touch.pageY;
            }
            //$("#timestamp").text(touch.pageX); // JD: 2
            //$("#timestamp").text(touch.pageY);
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
                touch.target.touching = false;
            }
        });
    };

    // var flick = function (event) { // JD: 2
    //     $.each(event.changedTouches, function (index, touch){
    //         if (touch.target.movingBox) {
    //             element.velocity.x = oldOffsetLeft - newOffsetLeft / timePassed;
    //             element.velocity.y = oldOffsetTop - newOffsetTop / timePassed;
    //         }
    //     });
    // };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;

            touch.target.height = jThis.height();
            touch.target.width = Jthis.width();

            touch.target.lastX = touch.pageX;
            touch.target.lastY = touch.pageY;

        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.velocity = { x: 0, y: 0 };
                element.acceleration = { x: 0, y: 0 };
                element.touching = false;
            });
    };

    var lastTimestamp = 0;
    var FRAME_RATE = 120;
    var MS_BETWEEN_FRAMES = 1000 / FRAME_RATE;

    var oldOffsetLeft;
    var oldOffsetTop;
    var newOffsetLeft;
    var newOffsetTop;

    var outerboxHeight = $("#drawing-area").height();
    var outerboxWidth = $("#drawing-area").width();
    var outerboxTop = $("#drawing-area").offset().top;
    var outerboxLeft = $("#drawing-area").offset().left;
    var outerboxBottom = outerboxTop + outerboxHeight;
    var outerboxRight = outerboxLeft + outerboxWidth;

    var updateBoxPositions = function (timestamp) {
        var timePassed = timestamp - lastTimestamp;
        if(timePassed > MS_BETWEEN_FRAMES) {
            $("div.box").each(function (index, element) {
                var offset = $(element).offset();
                offset.left += element.velocity.x * timePassed / 10; // JD: 6
                offset.top += element.velocity.y * timePassed / 10; // JD: 6

                newOffsetLeft = offset.left; // JD: 7
                newOffsetTop = offset.top; // JD: 7


                if(!element.touching){ // JD: 3, 4, 5
                    element.velocity.x += element.acceleration.x * timePassed;
                    element.velocity.y += element.acceleration.y * timePassed;
                };
                if(element.touching){
                    element.velocity.x = 0;
                    element.velocity.y = 0;
                }

                // JD: 9
                if (offset.left < outerboxLeft) {
                    offset.left = outerboxLeft;
                    element.velocity.x = element.velocity.x * -0.5; // JD: 6
                    if(Math.abs(element.velocity.x) < 0.3){ // JD: 3, 4, 6
                        element.velocity.x = 0;
                    }
                }
                if (offset.top < outerboxTop) {
                    offset.top = outerboxTop;
                    element.velocity.y = element.velocity.y * -0.5; // JD: 6
                    if(Math.abs(element.velocity.y) < 0.3){ // JD: 3, 4, 6
                        element.velocity.y = 0;
                    }
                }
                if (offset.top + $(element).height() > outerboxBottom) {
                    offset.top = outerboxBottom - $(element).height();
                    element.velocity.y = element.velocity.y * -0.5; // JD: 6
                    if(Math.abs(element.velocity.y) < 0.3){ // JD: 3, 4, 6
                        element.velocity.y = 0;
                    }
                }
                if (offset.left + $(element).width() > outerboxRight) {
                    offset.left = outerboxRight - $(element).width();
                    element.velocity.x = element.velocity.x * -0.5; // JD: 6
                    if(Math.abs(element.velocity.x) < 0.3){ // JD: 3, 4, 6
                        element.velocity.x = 0;
                    }
                }

                //element.velocity.x = oldOffsetLeft - newOffsetLeft / timePassed; // JD: 2
                //element.velocity.y = oldOffsetTop - newOffsetTop / timePassed;

                // JD: 3, 10
                if(element)
                $(element).offset(offset); // JD: 5
            });
            lastTimestamp = timestamp;
        }

        window.requestAnimationFrame(updateBoxPositions);
    };

    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffset = element.offset();

        
        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxPositions);

        window.addEventListener('devicemotion', function (event) {
            $("div.box").each(function (index, element) {
                element.acceleration.x = -event.accelerationIncludingGravity.x / 1000; // JD: 6
                element.acceleration.y = event.accelerationIncludingGravity.y / 1000; // JD: 6
            });

        });
    };

}(jQuery));
