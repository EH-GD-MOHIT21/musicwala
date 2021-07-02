mohit = -50
stateisReady = true
ispaused = false

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
        songAddress = "media/Heartless - Badshah 320 Kbps.mp3"
        break
    }
    if (songAddress != null && songAddress == "") {
        if (prompt("provided path is " + songAddress + " type yes for confirm?") == "yes") {
            break
        }
    }
}


UserSongLists = []

document.getElementById('mainaudio').src = songAddress

document.getElementById('playbtn').addEventListener('click', function() {
    if (this.className == "fa fa-play-circle-o playbtn" && !stateisReady) {
        this.className = "fa fa-pause-circle-o playbtn"
        try {
            audiosong.play()
            ispaused = false
            return
        } catch (err) {
            console.log()
        }
    } else if (!stateisReady) {
        this.className = "fa fa-play-circle-o playbtn"
        try {
            audiosong.pause()
            ispaused = true
            return
        } catch (err) {
            console.log()
        }
    }
    if (stateisReady) {
        playAudio()
        this.className = "fa fa-pause-circle-o playbtn"
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
        document.getElementById('playbtn').className = "fa fa-play-circle-o playbtn"
        document.getElementById('mainplayline').style.transform = "translate(-52%,-50%)"
            // play random music code
    } else if (!ispaused) {
        document.getElementById("mainplayline").style.transform = "translate(" + mohit + "%" + " , -50" + "%)";
        mohit += (100 / finalDuration)
        updatecurrenttime()
            // console.log(mohit)
    }
}

function playAudio() {
    audiosong = new Audio(songAddress)
    finalDuration = Math.floor(document.getElementById("mainaudio").duration)
    document.getElementById('starttime').textContent = "00:00"
    minutes = parseInt(finalDuration / 60)
    seconds = parseInt(finalDuration - minutes * 60)
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    document.getElementById('finalDur').textContent = minutes + ":" + seconds
    audiosong.play();
    stateisReady = false
}

function updatecurrenttime() {
    fakemohit = mohit + 50 // copy of variable(shifting origin)
    starttime = Math.floor(finalDuration * fakemohit / 100)
    starttime_min = Math.floor(starttime / 60)
    starttime_sec = Math.floor(starttime - starttime_min * 60)
    if (starttime_min < 10) {
        starttime_min = "0" + starttime_min
    }
    if (starttime_sec < 10) {
        starttime_sec = "0" + starttime_sec
    }
    document.getElementById('starttime').textContent = starttime_min + ":" + starttime_sec;
}

// next skip

document.getElementById('nxtbtn').addEventListener('click', function() {
    choosetheme()
    alert('Coming Soon...')
})

// prev skip

document.getElementById('prevbtn').addEventListener('click', function() {
    choosetheme()
    alert('Coming Soon...')
})

function prevMusic() {
    try {
        audiosong.currentTime -= 10.0;
        if ((mohit - ((100 / finalDuration) * (10.0))) >= -50)
            mohit -= (100 / finalDuration) * (10.0)
        else {
            mohit = -50
        }
    } catch (err) {
        console.log(err);
    }
}



function nextMusic() {
    try {
        audiosong.currentTime += 10.0;
        if ((mohit + ((100 / finalDuration) * (10.0))) <= 50)
            mohit += (100 / finalDuration) * (10.0)
        else {
            mohit = 50
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
}, false);

// Random ico GeneRator



function choosetheme() {
    randomValue = Math.floor(Math.random() * 10);
    color = listColors[randomValue]
    document.getElementById('imgarea').style.color = color;
}

choosetheme()