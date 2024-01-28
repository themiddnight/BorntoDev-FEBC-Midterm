// set up video, mark the course done and enable quiz button when video ends
let unchecked_symbol = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-circle"
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    </svg>`;
let checked_symbol = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
        class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>`;

let lessonID = 'lesson-1';
let checkID = 'check-1';

let checkSymbol = document.getElementById(checkID);

// reference: https://developers.google.com/youtube/iframe_api_reference
let videoID = 'eAiAlg22gqQ';
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: videoID,
        playerVars: {},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Video is ready to play - do any additional setup here
    // event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Video is playing - check for the last 10 seconds
        setInterval(() => {
            var currentTime = player.getCurrentTime();
            var duration = player.getDuration();

            if (duration - currentTime <= 10) {
                checkSymbol.innerHTML = checked_symbol;
            }
        }, 1000); // Check every second
    }
}
