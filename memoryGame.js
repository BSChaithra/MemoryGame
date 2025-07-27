const itemsArr = ["chocolate", "chocolate", "biscuit", "biscuit", "icecream", "icecream", "coffee", "coffee", "juice", "juice", "cake", "cake", "pizza", "pizza", "burger", "burger"];

let counter = 0;

let arr = [];

let ele;

let img;

let MaxCount = 60;

let boxesArrItem;

let shuffledArray = shuffleArray(itemsArr);

let boxesCollection = document.getElementsByClassName("box");

const boxesArr = Array.from(boxesCollection);
let BoxesArrlength = boxesArr.length;

let newBoxArr2 = [];

for (let i = 0; i < BoxesArrlength; i++) {
    newBoxArr2.push(boxesArr[i].id);
}

let itemsArrlength = itemsArr.length;

let randomIndex;
let imgSrc;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function generateItemsInBox() {
    document.getElementById("generateRandomItem").disabled = true;

    let timer = document.getElementById("timer");
    timer.innerHTML = "00:" + MaxCount;

    let wonDiv = document.getElementById("won");

    let intervalId = setInterval(function () {
        if (MaxCount == 0) {
            clearInterval(intervalId);

            for (let i = 0; i < BoxesArrlength; i++) {
                boxesArrItem = boxesArr[i].id;

                document.getElementById(boxesArrItem).setAttribute("style", "pointer-events: none;");
            }

            if (wonDiv.innerHTML == "") {
                wonDiv.setAttribute("style", "color: red");
                wonDiv.innerHTML = "You Lost";
				
				for (let i = 0; i < BoxesArrlength; i++) 
				{
					boxesArrItem = boxesArr[i].id;

					document.getElementById(boxesArrItem).setAttribute("style", "pointer-events: none;");
				}
				
                getPlayAgainButton();
            } 
        } else {
            MaxCount--;
            timer.innerHTML = "00:" + MaxCount;
        }
    }, 1000);

    for (let i = 0; i < BoxesArrlength; i++) {
        imgSrc = `${shuffledArray[i]}.png`;
        let imgId = "img" + i;

        boxesArr[i].innerHTML = `<img src="images/${imgSrc}" alt="ImgSource" width=50 height=50 />`;
    }
}

function checkIfEqual(id) {
    arr.push(id);

    let boxItem = document.getElementById(id);

    let boxItemImage = boxItem.querySelector("img");

    boxItemImage.setAttribute("style", "visibility: visible; pointer-events: none;");

    let newArr = [];
    let divArr = [];

    counter = counter + 1;

    if (counter == 2) {
        for (let i = 0; i < BoxesArrlength; i++) {
            boxesArrItem = boxesArr[i].id;
            document.getElementById(boxesArrItem).setAttribute("style", "pointer-events: none;");
        }

        for (let j = 0; j < arr.length; j++) {
            let divItemImage = document.getElementById(arr[j]);
            let imageId = divItemImage.querySelector("img");
            let imageSrc = imageId.src;

            let individualArrItem = imageSrc.split("/");
            let src = individualArrItem[individualArrItem.length - 1];

            newArr.push(src);
            divArr.push(arr[j]);
        }

        let checkIfEleEqual = newArr.every(checkIfAllEqual);

        if (checkIfEleEqual == true) {
            setTimeout(nohidefunction, 2000, divArr);
        } else {
            setTimeout(hidefunction, 1000, divArr);
        }
        counter = 0;

        arr = [];
    }
}

function checkIfAllEqual(element, index, array) {
    if (element == array[0]) {
        return true;
    } else {
        return false;
    }
}

function hidefunction(arr) {
    for (let i = 0; i < arr.length; i++) {
        ele = document.getElementById(arr[i]);

        img = ele.querySelector("img");

        img.setAttribute("style", "visibility: hidden;");
    }

    for (let i = 0; i < BoxesArrlength; i++) {
        boxesArrItem = boxesArr[i].id;

        document.getElementById(boxesArrItem).setAttribute("style", "pointer-events: auto;");
    }
}

function nohidefunction(arr) {
    for (let i = 0; i < arr.length; i++) {
        ele = document.getElementById(arr[i]);

        img = ele.querySelector("img");

        img.setAttribute("style", "visibility: visible; pointer-events: none;");
    }
    let indexOfEle;

    for (let i = 0; i < arr.length; i++) {
        if (newBoxArr2.includes(arr[i])) {
            indexOfEle = newBoxArr2.indexOf(arr[i]);
            newBoxArr2.splice(indexOfEle, 1);
        }
    }

    if (newBoxArr2.length == 0) {
        document.getElementById("won").style.color = "green";
        document.getElementById("won").innerHTML = "You won!!";

        getPlayAgainButton();
    }
    for (let i = 0; i < newBoxArr2.length; i++) {
        boxesArrItem = newBoxArr2[i];
        document.getElementById(boxesArrItem).setAttribute("style", "pointer-events: auto;");
    }
}

function getPlayAgainButton() {
    let generateRandom = document.getElementById("generateRandomItem");
    generateRandom.innerHTML = "Play Again";
    generateRandom.disabled = false;
    generateRandom.addEventListener("click", function () {
        setTimeout(function () {
            window.location.reload();
        }, 800);
    });
}
