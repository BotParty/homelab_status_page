//
//  Main.js
//  LearnableProgramming
//
//  Created by Bret Victor on 9/6/12.
//  (c) 2012 Bret Victor.  MIT open-source license.
//


(function(){


//====================================================================================
//
//  domready
//

window.addEvent('domready', function () {
    prepareVideos();
});


function prepareVideos () {
    Array.each($$(".example"), function (div) {
        var videos = div.getElementsByTagName("video");
        for (var i = 0; i < videos.length; i++) {
            prepareVideo(videos[i], div);
        }
    });
}


function prepareVideo (video, div) {
    var ua = navigator.userAgent.toLowerCase();
    var noPlayButton = ua.match(/iphone/) || ua.match(/ipod/);

    var width = parseInt(video.getAttribute("width"));
    var height = parseInt(video.getAttribute("height"));
    
    var chrome = $(document).getElement(".videoChrome").clone(true).inject(div);

    var videoOverlay = chrome.getElement(".videoOverlay");
    var videoPlayButton = chrome.getElement(".videoPlayButton");
    var videoDarken = chrome.getElement(".videoDarken");
    var marker = chrome.getElement(".marker");
    var markerProgressCanvas = chrome.getElement(".markerProgressCanvas");
    var markerProgressOverlay = chrome.getElement(".markerProgressOverlay");
    var markerPlayAgain = chrome.getElement(".markerPlayAgain");
    
    var insetTop = parseInt(div.getAttribute("data-top") || "0");
    var insetBottom = parseInt(div.getAttribute("data-bottom") || "0");
    var insetRight = parseInt(div.getAttribute("data-right") || "0");
    var insetRightPost = parseInt(div.getAttribute("data-postright") || insetRight.toString());
    var insetLeft = parseInt(div.getAttribute("data-left") || "0");
    var pushLeft = parseInt(div.getAttribute("data-push-left") || "0");
    var verboseButton = parseInt(div.getAttribute("data-verbose-button") || "0");
    var noMarker = parseInt(div.getAttribute("data-no-marker") || "0");

    height -= insetTop + insetBottom;
    width -= insetLeft + insetRight + pushLeft;

    chrome.setStyles({ display:"block" });

    if (verboseButton) { videoPlayButton.addClass("verbose"); } 
    else { videoPlayButton.removeClass("verbose"); }
    
    if (noPlayButton) { videoPlayButton.setStyle("display", "none"); }
    if (noMarker) { marker.setStyle("display", "none"); }


    // sizes
    
    var updateSizes = function () {
        div.setStyles({ left:-pushLeft });
        chrome.setStyles({ width:width, height:height, top:insetTop, left:pushLeft });
        videoOverlay.setStyles({ width:width - 2, height: height - 2, left:insetLeft });
        videoDarken.setStyles({ left:insetLeft });
        videoPlayButton.setStyles({ left:Math.round(0.5 * (width - 78)), 
            top:Math.round(0.5 * (height - (verboseButton ? 88 : 78))) });
    };

    updateSizes();
    

    // playing

    var isPlaying = false;
    var didPlay = false;
    
    var playVideo = function () {
        isPlaying = true;
        didPlay = true;

        videoOverlay.setStyle("display", "none");
        videoDarken.setStyle("backgroundColor", "transparent");
        videoDarken.setStyle("cursor", "none");

        markerProgressCanvas.setStyle("display", "block");
        markerProgressOverlay.setStyle("display", "block");
        markerPlayAgain.setStyle("display","none");
        
        width += insetRight - insetRightPost;
        insetRight = insetRightPost;
        updateSizes();
        
        updateCurrentTime();
        video.play();
    };
    
    var videoWasClicked = function () {
        if (isPlaying && !video.paused) {
            video.setAttribute("controls", "controls");
            videoDarken.setStyle("display", "none");
            video.pause();
        }
        else {
            video.removeAttribute("controls");
            videoDarken.setStyle("display", "block");
            playVideo();
        }
    };
    
    var updateCurrentTime = function () {
        var duration = video.duration;
        if (isNaN(duration) || duration <= 0) { return; }
        var currentTime = video.currentTime;
        if (isNaN(currentTime)) { currentTarget = 0; }
        
        updateCanvasWithProgress(markerProgressCanvas, currentTime / duration);
    };


    // video events

    video.addEventListener("timeupdate", function () {
        updateCurrentTime();
    }, false);
    
    video.addEventListener("ended", function () {
        isPlaying = false;
        
        videoDarken.setStyle("cursor", "pointer");
        markerProgressCanvas.setStyle("display", "none");
        markerProgressOverlay.setStyle("display", "none");
        markerPlayAgain.setStyle("display","block");

    }, false);
    

    // marker mousing

    marker.addEvent("click", function () {
        videoWasClicked();
    });


    // video mousing
    // (events added to videoDarken because iPad can't deal with click event on video element itself)
   
    videoDarken.addEvent("click", function () {
        videoWasClicked();
    });

    videoDarken.addEvent("mouseenter", function () {
        if (isPlaying) { return; }

        if (didPlay) {
            videoOverlay.setStyle("display", "block");
        }
        else {
            videoDarken.setStyle("backgroundColor", "rgba(0,0,0,0.1)");
        }
    });
    
    videoDarken.addEvent("mouseleave", function () {
        if (isPlaying) { return; }

        if (didPlay) {
            videoOverlay.setStyle("display", "none");
        }
        videoDarken.setStyle("backgroundColor", "transparent");
    });
}


function updateCanvasWithProgress (canvas, progress) {
    var width = parseInt(canvas.getAttribute("width"));
    var height = parseInt(canvas.getAttribute("height"));
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0,0,width,height);
    ctx.save();
    ctx.translate(width/2, height/2);
    
    var radius = width/2 - 1;

    ctx.beginPath();
    ctx.arc(0,0, radius, -Math.PI * 0.5, -Math.PI * 0.5 + progress * Math.PI * 2);
    ctx.lineTo(0,0);
    ctx.lineTo(0, radius);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    
    ctx.restore();
}


//====================================================================================

})();

