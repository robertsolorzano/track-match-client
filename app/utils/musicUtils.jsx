let currentlyPlayingAudio = null;

export function keyNumberToLetter(keyNumber) {
    const numberMap = {
        0: 'C',
        1: 'C#',
        2: 'D',
        3: 'D#',
        4: 'E',
        5: 'F',
        6: 'F#',
        7: 'G',
        8: 'G#',
        9: 'A',
        10: 'A#',
        11: 'B'
    };
    return numberMap[keyNumber];
}

export function timeNumberToFraction(timeNumber) {
    const numberTimeMap = {
        3: '3/4',
        4: '4/4',
        5: '5/4',
        6: '6/4',
        7: '7/4',
    };
    return numberTimeMap[timeNumber];
}


export function modeNumberToMusicalKey(modeNumber) {
    const numberModeMap = {
        0: 'Minor',
        1: 'Major',
    };
    return numberModeMap[modeNumber];
}

export function msToTime(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function togglePlayPause(audioPlayer, playIcon) {
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audioPlayer) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.parentNode.querySelector('.play-icon').style.backgroundImage = 'url("./assets/images/play-icon.png")';
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.backgroundImage = 'url("./assets/pause-icon.png")';
    } else {
        audioPlayer.pause();
        playIcon.style.backgroundImage = 'url("./assets/play-icon.png")';
    }
    currentlyPlayingAudio = audioPlayer.paused ? null : audioPlayer;
}