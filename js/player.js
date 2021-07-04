// variables declare here


music = document.querySelector('audio');
lineoffset = -50
songisplaying = false
is_paused = false

userSong = []
userindex = -1

// custom colors of song icon
listColors = [
    "#00b894",
    "#0984e3",
    "#e84393",
    "#6c5ce7",
    "#d63031",
    "#be2edd",
    "#6ab04c",
    "#22a6b3",
    "#82589F",
    "#6D214F"
]

const MEDIA_ROOT = '/media';

const MEDIA_INFO = {
    0: {
        "name": "Heartless",
        "singer": "Badshah",
        "path": "media/Heartless - Badshah 320 Kbps.mp3"
    },
    1: {
        "name": "Chale Aana",
        "singer": "De De Pyar De",
        "path": "media/Chale Aana - De De Pyaar De.mp3"
    },
    2: {
        "name": "Buzz",
        "singer": "Badshah Astha Gill",
        "path": "media/Buzz-(Mr-Jatt.com).mp3"
    }
}

length_obj = 0
for (elm in MEDIA_INFO) length_obj += 1;

// ends here fake api


// functions Declarations starts here


function playsong() {
    if (!songisplaying) {
        PlayingSong = document.getElementById('mainaudio');
        PlayingSong.play();

        songisplaying = true;
        changePlayIcon();
    } else if (!is_paused) {

        try {
            PlayingSong.pause();
            is_paused = true;
            changePlayIcon();

        } catch (err) {
            console.log();
        }
    } else if (is_paused) {

        try {
            PlayingSong.play();
            is_paused = false;
            changePlayIcon();

        } catch (err) {
            console.log();
        }

    }
}


function changeSongDetails(songName, artist) {
    document.getElementById('stitle').textContent = songName;
    document.getElementById('sname').textContent = artist;
}


function changePlayIcon() {
    if (songisplaying && !is_paused) {
        document.getElementById('playbtn').className = "fa fa-pause-circle-o playbtn";
    } else {
        document.getElementById('playbtn').className = "fa fa-play-circle-o playbtn";
    }
}



function chooseSong() {
    value = Math.floor(Math.random() * length_obj);
    updateuservisitedsong(value);
    return MEDIA_INFO[value];
}


function updateSongOnHTML(href) {
    document.getElementById('mainaudio').src = href;
}



function updateline(currentTime, duration) {
    if (isNaN(currentTime))
        return

    if (isNaN(duration))
        return

    lineoffset = (currentTime / duration) * 100 - 50;
    document.getElementById("mainplayline").style.transform = "translate(" + lineoffset + "%" + " , -50" + "%)";

}


function updatecurrenttime(currentTime) {
    validform = sectominsec(currentTime);
    document.getElementById('starttime').textContent = validform;
}


function updateFinalTime(Time) {
    validform = sectominsec(Time);
    document.getElementById('finalDur').textContent = validform;
}


function playprevsong() {
    stopthesong();
    if (userSong.length > 1) {
        cursong = userSong.pop();
        return_this = userSong[userindex - 1];
        userindex -= 1;
        songid = return_this;

    } else {
        songid = userSong[userindex];
    }
    changeSongDetails(MEDIA_INFO[songid]["name"], MEDIA_INFO[songid]["singer"]);
    updateSongOnHTML(MEDIA_INFO[songid]["path"]);

    choosetheme();
    playsong();
}


function stopthesong() {
    try {
        PlayingSong.pause();
        is_paused = false;
        songisplaying = false;
        changePlayIcon();
    } catch (err) {
        console.log();
    }
}

function updateuservisitedsong(value) {
    userSong = userSong.concat([parseInt(value)]);
    userindex += 1;
}


function playnewsong() {
    stopthesong();
    obj = chooseSong();
    changeSongDetails(obj["name"], obj["singer"]);
    updateSongOnHTML(obj["path"]);
    choosetheme();
    playsong();
}



function setRandomSongOnce() {
    obj = chooseSong();
    changeSongDetails(obj["name"], obj["singer"]);
    updateSongOnHTML(obj["path"]);
}


// time converter

function sectominsec(timeinsec) {
    minutes = Math.floor(parseInt(timeinsec) / 60);
    seconds = Math.floor(parseInt(timeinsec) % 60);

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return (minutes + ":" + seconds);
}




// theme Generator

function choosetheme() {
    randomValue = Math.floor(Math.random() * 10);
    color = listColors[randomValue];
    document.getElementById('imgarea').style.color = color;
}



function backsometime() {
    try {
        PlayingSong.currentTime -= 10.0;
    } catch (err) {
        console.log();
    }
}


function forwardsometime() {
    try {
        PlayingSong.currentTime += 10.0;
    } catch (err) {
        console.log();
    }
}




//  element listners

document.getElementById('playbtn').addEventListener('click', playsong);

document.getElementById('nxtbtn').addEventListener('click', playnewsong);

document.getElementById('prevbtn').addEventListener('click', playprevsong);

document.getElementById('bfwd').addEventListener('click', backsometime);

document.getElementById('nfwd').addEventListener('click', forwardsometime);





// bug probabity high
document.getElementById('parentline').addEventListener('click', (event) => {
    
    const { currentTime, duration } = music;
    var devicewidth = window.innerWidth;
    
    var linewidth = parseInt((window.getComputedStyle(document.getElementById('parentline')).width).slice(0, -2));
    restwidth = (devicewidth - linewidth) / 2;
    
    progress = ((event.x - restwidth) / event.srcElement.clientWidth) * duration;
    console.log(progress, linewidth);
    
    try {
        PlayingSong.currentTime = progress;
    } catch (err) {
        console.log();
    }

});

// ends here (skip bug)




// key handler events here

document.addEventListener('keydown', (event) => {
    var Keyname = event.key;

    if (Keyname == 'ArrowUp')
        playnewsong();

    else if (Keyname == 'ArrowDown')
        playprevsong();

    else if (Keyname == ' ')
        playsong();

    else if (Keyname == 'ArrowRight')
        forwardsometime()

    else if (Keyname == 'ArrowLeft')
        backsometime()

}, false);



// music click listener

music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;

    if (!isNaN(currentTime)) {
        updatecurrenttime(currentTime);
    }

    if (!isNaN(duration)) {
        updateFinalTime(duration);
    }

    if ((!isNaN(currentTime)) && (!isNaN(duration))) {
        updateline(currentTime, duration);
    }

    if (!isNaN(currentTime) && currentTime == duration) {
        document.getElementById('playbtn').className = "fa fa-play-circle-o playbtn";
        document.getElementById('starttime').textContent = "0:00";
        document.getElementById('mainplayline').style.transform = "translate(-52%,-50%)";
    }

});






// functions call
setRandomSongOnce()
choosetheme()
