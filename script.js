btnGroup = document.getElementById("btnGroup");
btnAnimal = document.getElementById("Animal");
btnSport = document.getElementById("Sport");
btnPays = document.getElementById("Pays");
btnStart = document.getElementById("startGame");
gameMessage = document.getElementById("gameMessage");
myAlphabets = document.getElementById("alphabets");
hint = document.getElementById("hint");
lives = document.getElementById("lives");
liveSection = document.getElementById("liveSection");
correctWord = document.getElementById("correctWord");
PlayAgain = document.getElementById("PlayAgain");
const canvas = document.getElementById("hangman");
canvas.classList.add("d-none");
var choosenCategory = "";
let randomGame = -1;
let index = -1;
let map = new Map();

map.set("Animal", 0);
map.set("Sport", 1);
map.set("Pays", 2);

var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const words = [
    ["baleine", "eucalyptus", "coquillage", "elephant"],
    ["basketball", "tennis", "natation"],
    ["tunis", "alger", "paris"],
];

const hints = [
    [
        "Quel est le plus grand mammifère marin de la planète ?",
        "Que mange le koala ?",
        "Quel est l'animal le plus vieux connu sur Terre?",
        "De quel animal la taupe dorée est-elle une cousine éloignée?",
    ],
    [
        "Dans quel sport est illustré Michael Jordan ?",
        "Dans quel sport est illustrée Steffi Graf ?",
        "Dans quel sport est illustrée Dawn Fraser ?",
    ],
    ["capital de tunisie ?", "capital algerie ?", "capital de france ?"],
];
// **************Afficher Le bouton start**********
function showStartButton() {
    var getSelectedValue = document.querySelector(
        'input[name="category"]:checked'
    );
    if (getSelectedValue != null) {
        btnStart.classList.remove("d-none");
        if (getSelectedValue.id == "Animal") {
            choosenCategory = getSelectedValue.id;
        } else if (getSelectedValue.id == "Sport") {
            choosenCategory = getSelectedValue.id;
        } else {
            choosenCategory = getSelectedValue.id;
        }
    }
}
btnGroup.addEventListener("click", showStartButton);

btnStart.addEventListener("click", () => {
    canvas.classList.remove("d-none");
    btnGroup.classList.add("d-none");
    correctWord.classList.remove("d-none");
    gameMessage.textContent = "Start Guessing";
    index = map.get(choosenCategory);
    randomGame = Math.floor(Math.random() * words[index].length);
    btnStart.classList.add("d-none");
    showAlphabets();
    hint.textContent = hints[index][randomGame];
    hint.classList.remove("d-none");
    hint.classList.add("d-block");
    liveSection.classList.remove("d-none");
    liveSection.classList.add("d-block");
    lives.textContent = 8;
    createInput();
});

// create des inputs selon longueurs du mot
function createInput() {
    for (let i = 0; i < words[index][randomGame].length; i++) {
        inp = document.createElement("input");
        inp.classList.add("form-control");
        inp.id = `id${i}`;
        inp.readOnly = true;
        correctWord.appendChild(inp);
    }
}

// vérifier si tous les champs sont remplis
function verifChildrenCorrectWord() {
    let nullInput = false;
    for (const elem of correctWord.children) {
        if (elem.value == "") {
            nullInput = true;
        }
    }
    return nullInput;
}

// create alphabet ul
function showAlphabets() {
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
        letters.id = "alphabet";
        letters.classList.add("list-group");
        letters.classList.add("list-group-horizontal");
        letters.classList.add("d-flex");
        letters.classList.add("flex-wrap");
        list = document.createElement("li");
        list.classList.add("list-group-item");
        list.style.listStyle = "none";

        list.id = "letter";
        button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-light");
        button.classList.add("m-1");
        button.id = `${i}`;
        button.style.borderRadius = 0;
        button.textContent = alphabet[i];
        list.appendChild(button);
        letters.appendChild(list);
    }
    // récuperer la valeur de chaque boutton
    for (const elem of letters.children) {
        elem.addEventListener("click", function() {
            if (Number(lives.textContent) > 0 && verifChildrenCorrectWord()) {
                elem.classList.add("disabled");
                elem.style.opacity = 0.7;

                var success = false;
                for (let i = 0; i < words[index][randomGame].length; i++) {
                    if (elem.textContent == words[index][randomGame][i]) {
                        success = true;
                        const inpt = document.getElementById(`id${i}`);
                        inpt.value = words[index][randomGame][i];
                    }
                }
                // décrementer lives
                if (!success) {
                    lives.textContent = Number(lives.textContent) - 1;
                    console.log(Number(lives.textContent) > 4);
                    Draw(draws[step++]);
                    // Number(lives.textContent) > 3 ? Draw(draws[step++]) : null;
                    // Number(lives.textContent) < 1 ? Draw(draws[step++]) : null;
                    // undefined === draws[step] ? (this.disabled = true) : null;
                }
                result();
            }
        });
    }

    myAlphabets.appendChild(letters);
}

//***** show result loose-win****** */
function result() {
    //win
    if (!verifChildrenCorrectWord() && Number(lives.textContent) > 0) {
        PlayAgain.classList.remove("d-none");
        gameMessage.textContent = "You Win 🤩";
        document.body.classList.remove("bg-dark");
        document.body.classList.add("bg-success");
    }
    //loose
    if (Number(lives.textContent) == 0) {
        PlayAgain.classList.remove("d-none");
        gameMessage.textContent = "You loose 😔";
        document.body.classList.remove("bg-dark");
        document.body.classList.add("bg-danger");
        hint.textContent = "the word is :" + words[index][randomGame];
    }
}

function letterExist() {}

function verifLetter() {}

/******** play again  ************/
PlayAgain.addEventListener("click", () => {
    lives.textContent = 8;
    liveSection.classList.add("d-none");
    PlayAgain.classList.add("d-none");
    document.body.classList.remove("bg-success");
    document.body.classList.remove("bg-danger");
    document.body.classList.add("bg-dark");

    btnGroup.classList.remove("d-none");
    // correctWord.classList.add("d-none");
    correctWord.replaceChildren();
    choosenCategory = "";
    canvas.classList.add("d-none");
    letters.classList.add("d-none");
    hint.classList.add("d-none");
    gameMessage.textContent = "Choose your category";

    clearCanvas();
    step = 0;
});

/******** Draw Hangman  ************/

const context = canvas.getContext("2d");

clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

Draw = (part) => {
    switch (part) {
        case "gallows1":
            context.strokeStyle = "#fff";
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(175, 225);
            context.lineTo(5, 225);
            // context.moveTo(40, 225);
            // context.lineTo(25, 5);
            // context.lineTo(100, 5);
            // context.lineTo(100, 25);
            context.stroke();
            break;

        case "gallows2":
            context.strokeStyle = "#fff";
            context.lineWidth = 4;
            context.beginPath();
            // context.moveTo(175, 225);
            // context.lineTo(5, 225);
            context.moveTo(40, 225);
            context.lineTo(25, 5);
            context.lineTo(100, 5);
            context.lineTo(100, 25);
            context.stroke();
            break;

        case "head":
            context.lineWidth = 2;
            context.beginPath();
            context.arc(100, 50, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            break;

        case "body":
            context.beginPath();
            context.moveTo(100, 75);
            context.lineTo(100, 140);
            context.stroke();
            break;

        case "rightHarm":
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(60, 100);
            context.stroke();
            break;

        case "leftHarm":
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(140, 100);
            context.stroke();
            break;

        case "rightLeg":
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 190);
            context.stroke();
            break;

        case "rightFoot":
            context.beginPath();
            context.moveTo(82, 190);
            context.lineTo(70, 185);
            context.stroke();
            break;

        case "leftLeg":
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(125, 190);
            context.stroke();
            break;

        case "leftFoot":
            context.beginPath();
            context.moveTo(122, 190);
            context.lineTo(135, 185);
            context.stroke();
            break;
    }
};

const draws = [
    "gallows1",
    "gallows2",
    "head",
    "body",
    "rightHarm",
    "leftHarm",
    "rightLeg",
    "leftLeg",
    "rightFoot",
    "leftFoot",
];
var step = 0;