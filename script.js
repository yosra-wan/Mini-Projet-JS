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

var choosenCategory = "";
let randomGame = -1;
let index = -1;
let map = new Map();

// let lives = 10;

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
    ["chat", "chien", "cheval", "elephant"],
    ["football", "tennnis", "volleyball"],
    ["tunisie", "algerie", "maroc"],
];

const hints = [
    ["chat ?", "chien ?", "cheval ?"],
    ["football ?", "tennis ?", "volleyball ?"],
    ["tunisie ?", "algerie ?", "maroc ?"],
];

// Afficher Le bouton start
btnGroup.addEventListener("click", () => {
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
});

btnStart.addEventListener("click", () => {
    btnGroup.classList.add("d-none");
    gameMessage.textContent = "Start Guessing";
    // console.log("choosen cat", choosenCategory);
    index = map.get(choosenCategory);
    randomGame = Math.floor(Math.random() * words[index].length);
    // console.log("random", randomGame);
    btnStart.classList.add("d-none");
    showAlphabets();
    hint.textContent = hints[index][randomGame];
    hint.classList.remove("d-none");
    hint.classList.add("d-block");
    liveSection.classList.remove("d-none");
    liveSection.classList.add("d-block");
    lives.textContent = 10;
    // create des inputs selon longueurs du mot
    for (let i = 0; i < words[index][randomGame].length; i++) {
        inp = document.createElement("input");
        inp.classList.add("form-control");
        inp.id = `id${i}`;
        inp.readOnly = true;
        correctWord.appendChild(inp);
    }
});

function verifChildrenCorrectWord() {
    let nullInput = false;
    for (const elem of correctWord.children) {
        if (elem.value == "") {
            nullInput = true;
        }
    }
    return nullInput;
    // correctWord.children;
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
                // console.log(" elem.children", elem.children.disabled);
                // console.log(" elem.dis", elem.disabled);
                elem.classList.add("disabled");
                elem.style.opacity = 0.7;

                // console.log(words[index][randomGame]);
                var success = false;
                for (let i = 0; i < words[index][randomGame].length; i++) {
                    if (elem.textContent == words[index][randomGame][i]) {
                        success = true;
                        const inpt = document.getElementById(`id${i}`);
                        inpt.value = words[index][randomGame][i];
                        // console.log("yes");
                    }
                    if (!verifChildrenCorrectWord() && Number(lives.textContent) > 0) {
                        PlayAgain.classList.remove("d-none");
                        gameMessage.textContent = "You Win";
                    }
                }
                if (!success) {
                    lives.textContent = Number(lives.textContent) - 1;
                }
                if (Number(lives.textContent) == 0) {
                    PlayAgain.classList.remove("d-none");
                    gameMessage.textContent = "You loose";
                }
                // console.log("index", index);
                // console.log(elem.textContent);
            }
        });
    }

    myAlphabets.appendChild(letters);
}

PlayAgain.addEventListener("click", () => {
    lives.textContent = 10;
    PlayAgain.classList.add("d-none");
});

function verifLetter(button) {
    // console.log(button.textContent);
}