UserSongLists = [0] // keeps a track of visited songs
userindex = 0 // keeps a track of max_index

// fake music api

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


// change the public html data based on api data
function changeNames(songname, songartist) {
    document.getElementById('stitle').textContent = songname;
    document.getElementById('sname').textContent = songartist;
}



// next song code here

document.getElementById('nxtbtn').addEventListener('click', function() {
    try {
        choosetheme();
        random_value = Math.floor(Math.random() * length_obj);
        music = MEDIA_INFO[random_value]["name"]
        singer = MEDIA_INFO[random_value]["singer"]
        path = MEDIA_INFO[random_value]["path"]

        try {
            audiosong.pause();
        } catch (err) {
            console.log();
        }

        updateuservisited(true, random_value);
        songAddress = path;


        document.getElementById('mainaudio').src = songAddress;
        setid = setInterval(xyz, 100);

        changeNames(music, singer);
        playAudio();

        document.getElementById('playbtn').className = "fa fa-pause-circle-o playbtn";
        mohit = -50;

        document.getElementById('mainplayline').style.transform = "translate(-52%,-50%)";
        ispaused = false;

        try {
            clearInterval(id);
        } catch (err) {
            console.log();
        }

        id = setInterval(lineincreasefunc, 1000);

    } catch (err) {
        console.log(err);
    }

});


function xyz() {
    try {
        if (isNaN(document.getElementById("mainaudio").duration))
            return
        parseInt(document.getElementById("mainaudio").duration);
        finalDuration = Math.floor(document.getElementById("mainaudio").duration);
        playAudio(notfunccall = false);
        clearInterval(setid);
    } catch (err) {
        console.log();
    }
}

// prev code song here
// pending work
function updateuservisited(increment = true, songid = 0) {
    if (increment) {
        UserSongLists = UserSongLists.concat(parseInt(songid));
        userindex += 1;
        return 1;
    } else {
        return infolastsong();
    }
}

function infolastsong() {
    if (UserSongLists.length > 1) {
        cursong = UserSongLists.pop();
        return_this = UserSongLists[userindex - 1]
        userindex -= 1;
        return return_this;
    } else {
        return UserSongLists[userindex]
    }
}

mohit = -50;
stateisReady = true;
ispaused = false;


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


// alert('Use key left to prev 10sec key right to next 10sec')


while (true) {
    songAddress = prompt("Please provide me a path for your mp3 file like C:/users/mohit.mp3 or type mohit and press ok for default song.")
    if (songAddress == "mohit") {
        // choose Random 
        random_value = Math.floor(Math.random() * length_obj);
        music = MEDIA_INFO[random_value]["name"]
        singer = MEDIA_INFO[random_value]["singer"]
        path = MEDIA_INFO[random_value]["path"]
        songAddress = path;
        changeNames(music, singer);
        UserSongLists = [random_value]
        break;
    }
    if (songAddress != null && songAddress != "") {
        if (prompt("provided path is " + songAddress + " type yes for confirm?") == "yes") {
            break;
        }
    }
}


document.getElementById('mainaudio').src = songAddress;

document.getElementById('playbtn').addEventListener('click', function() {
    if (this.className == "fa fa-play-circle-o playbtn" && !stateisReady) {
        this.className = "fa fa-pause-circle-o playbtn";
        try {
            audiosong.play();
            ispaused = false;
            return
        } catch (err) {
            console.log();
        }
    } else if (!stateisReady) {
        this.className = "fa fa-play-circle-o playbtn"
        try {
            audiosong.pause()
            ispaused = true;
            return
        } catch (err) {
            console.log();
        }
    }
    if (stateisReady) {
        playAudio()
        this.className = "fa fa-pause-circle-o playbtn";
        id = setInterval(lineincreasefunc, 1000);
    } else {
        alert("song is already playing");
    }
})

function lineincreasefunc() {
    if (mohit > 50) {
        clearInterval(id);

        stateisReady = true;
        mohit = -50;

        document.getElementById('playbtn').className = "fa fa-play-circle-o playbtn";
        document.getElementById('mainplayline').style.transform = "translate(-52%,-50%)";
        // play random music code
    } else if (!ispaused) {
        document.getElementById("mainplayline").style.transform = "translate(" + mohit + "%" + " , -50" + "%)";
        mohit += (100 / finalDuration);
        updatecurrenttime();
        // console.log(mohit)
    }
}



function playAudio(notfunccall = true) {
    if (notfunccall) {
        audiosong = new Audio(songAddress);
        audiosong.play();
    }
    // loading time for tag
    finalDuration = Math.floor(document.getElementById("mainaudio").duration);
    if (isNaN(finalDuration)) {
        playAudio(false)
    }
    if (!isNaN(finalDuration)) {
        document.getElementById('starttime').textContent = "00:00";

        minutes = parseInt(finalDuration / 60);
        seconds = parseInt(finalDuration - minutes * 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById('finalDur').textContent = minutes + ":" + seconds;
    }
    stateisReady = false;
}

function updatecurrenttime() {
    fakemohit = mohit + 50; // copy of variable(shifting origin)
    starttime = Math.floor(finalDuration * fakemohit / 100);
    if (!isNaN(starttime)) {
        starttime_min = Math.floor(starttime / 60);
        starttime_sec = Math.floor(starttime - starttime_min * 60);
        if (starttime_min < 10) {
            starttime_min = "0" + starttime_min;
        }
        if (starttime_sec < 10) {
            starttime_sec = "0" + starttime_sec;
        }
        document.getElementById('starttime').textContent = starttime_min + ":" + starttime_sec;
    }
}


// prev skip

document.getElementById('prevbtn').addEventListener('click', function() {
    choosetheme();
    songid = updateuservisited(false);

    try {
        audiosong.pause();
    } catch (err) {
        console.log(err);
    }
    music = MEDIA_INFO[songid]["name"]
    singer = MEDIA_INFO[songid]["singer"]
    path = MEDIA_INFO[songid]["path"]

    songAddress = path


    setid = setInterval(xyz, 100);
    document.getElementById('mainaudio').src = songAddress;

    changeNames(music, singer);
    playAudio();

    document.getElementById('playbtn').className = "fa fa-pause-circle-o playbtn";
    mohit = -50;

    document.getElementById('mainplayline').style.transform = "translate(-52%,-50%)";
    ispaused = false;

    try {
        clearInterval(id);
    } catch (err) {
        console.log();
    }
    id = setInterval(lineincreasefunc, 1000);
})

function prevMusic() {
    try {
        audiosong.currentTime -= 10.0;
        if ((mohit - ((100 / finalDuration) * (10.0))) >= -50)
            mohit -= (100 / finalDuration) * (10.0);
        else {
            mohit = -50;
        }
    } catch (err) {
        console.log(err);
    }
}



function nextMusic() {
    try {
        audiosong.currentTime += 10.0;
        if ((mohit + ((100 / finalDuration) * (10.0))) <= 50)
            mohit += (100 / finalDuration) * (10.0);
        else {
            mohit = 50;
        }
    } catch (err) {
        console.log(err);
    }
}



// key handler events

document.addEventListener('keydown', (event) => {
    var Keyname = event.key;

    if (Keyname == 'ArrowRight')
        nextMusic();

    else if (Keyname == 'ArrowLeft')
        prevMusic();

    else if (Keyname == ' ') {
        btn = document.getElementById('playbtn')
        if (btn.className == "fa fa-play-circle-o playbtn" && !stateisReady) {
            btn.className = "fa fa-pause-circle-o playbtn";
            try {
                audiosong.play();
                ispaused = false;

                return
            } catch (err) {
                console.log();

            }
        } else if (!stateisReady) {
            btn.className = "fa fa-play-circle-o playbtn"
            try {
                audiosong.pause()
                ispaused = true;

                return
            } catch (err) {
                console.log();

            }
        }
        if (stateisReady) {
            playAudio()
            btn.className = "fa fa-pause-circle-o playbtn";
            id = setInterval(lineincreasefunc, 1000);
        } else {
            alert("song is already playing");
        }
    }

}, false);


document.getElementById("nfwd").addEventListener('click', function() {
    nextMusic();
})


document.getElementById("bfwd").addEventListener('click', function() {
    prevMusic();
})



// Random ico GeneRator



function choosetheme() {
    randomValue = Math.floor(Math.random() * 10);
    color = listColors[randomValue]
    document.getElementById('imgarea').style.color = color;
}



choosetheme();
