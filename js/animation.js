// version 2.0

DefaultValues = [50, 50, 80, 70, 20, 40, 80, 70, 40, 20]
Animation_on = true
decmenter = 1
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

objects = document.getElementsByClassName('vlines')

dec = [true, true, true, true, true, true, true, true, true, true]

function createAnimation() {
    id1 = setInterval(first, 10, 0)
    id2 = setInterval(first, 10, 1)
    id3 = setInterval(first, 10, 2)
    id4 = setInterval(first, 10, 3)
    id5 = setInterval(first, 10, 4)
    id6 = setInterval(first, 10, 5)
    id7 = setInterval(first, 10, 6)
    id8 = setInterval(first, 10, 7)
    id9 = setInterval(first, 10, 8)
    id10 = setInterval(first, 10, 9)
}

function first(index) {
    value = DefaultValues[index]
    if (dec[index]) {
        DefaultValues[index] -= decmenter
    } else {
        DefaultValues[index] += decmenter
    }
    if (DefaultValues[index] <= 4) {
        dec[index] = false
        objects[index].style.background = listColors[Math.floor(Math.random() * 10)]
    } else if (DefaultValues[0] >= 85) {
        dec[index] = true
        objects[index].style.background = listColors[Math.floor(Math.random() * 10)]
    }
    objects[index].style.top = value + "%"
}

document.getElementById('animateManager').addEventListener('click', function() {
    decmenter += 1
    if (decmenter >= 4) {
        decmenter = 0
    }
    if (Animation_on && decmenter == 0) {
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
        clearInterval(id4);
        clearInterval(id5);
        clearInterval(id6);
        clearInterval(id7);
        clearInterval(id8);
        clearInterval(id9);
        clearInterval(id10);
        Animation_on = false
    } else if (!Animation_on) {
        decmenter = 1
        createAnimation()
        Animation_on = true;
    }

});


// help btn goes here


document.getElementById('helpguide').addEventListener('click', function() {
    alert(
        "use spacebar to pause/play arrow keys to forward/back for 10 sec."
    )
})



createAnimation()


// sun icon manager

document.getElementById('sunico').addEventListener('click', function() {
    if (this.className == 'fa fa-sun-o') {
        this.className = 'fa fa-moon-o';
        document.querySelector('body').style.background = "white";
        document.getElementById('foottext').style.color = "black";
    } else {
        this.className = 'fa fa-sun-o';
        document.querySelector('body').style.background = "#171d23";
        document.getElementById('foottext').style.color = "white";
    }
})