// MUSICWALA vesion 2.2 Feature Update

words = document.getElementsByClassName('animationword')
IsanimeRuning = false
uindex = 0

colors = [
    "crimson",
    "green",
    "yellow",
    "violet",
    "purple",
    "cyan",
    "olivedrab",
    "lightgreen",
    "orange"
]

function createAnime() {
    IsanimeRuning = true;
    document.getElementById("wordwala").style.display = "block";
    for (i = 0; i < words.length; i++) {
        words[i].style.color = colors[i]
    }
    Animations = []
    for (i = 0; i < words.length; i++) {
        idA = setInterval(animation, 100 + 10 * i, words[i], i);
        Animations.push(idA)
    }
}



function animation(element, index) {
    try {
        element.style.color = window.getComputedStyle(words[index - 1]).color
    } catch (err) {
        element.style.color = colors[Math.floor(Math.random() * colors.length)]
    }
}


function removeAnime() {
    IsanimeRuning = false;
    document.getElementById('wordwala').style.display = "none";
    for (i = 0; i < Animations.length; i++)
        clearInterval(Animations[i])
    Animations = []
    for (i = 0; i < words.length; i++) {
        words[i].style.color = colors[i]
    }
}

document.getElementById('sunico').addEventListener('click', function() {
    if (this.className == "fa fa-sun-o" && !IsanimeRuning) {
        createAnime();
    } else {
        removeAnime();
    }
})


document.getElementById('wordwala').style.display = "none";


document.getElementById('pluganimate').addEventListener('click', function() {
    if (IsanimeRuning) {
        document.getElementById('wordwala').style.display = "none";
        removeAnime();
    } else {
        document.getElementById('wordwala').style.display = "block";
        createAnime();
    }
})