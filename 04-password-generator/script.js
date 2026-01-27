const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
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

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let characters = [];

let firstPassword = document.getElementById("pw-one");
let secondPassword = document.getElementById("pw-two");

let slider = document.getElementById("characterRange");
let output = document.getElementById("characterValue");
output.textContent = slider.value;

slider.oninput = function () {
  output.textContent = this.value;
};

let withNumbers = document.getElementById("includeNum");
let withSymbols = document.getElementById("includeSym");

function passwordArray() {
  characters = [];

  // always add letters
  for (let i = 0; i < letters.length; i++) {
    characters.push(letters[i]);
  }

  // numbers if toggled
  if (withNumbers.checked) {
    for (let i = 0; i < numbers.length; i++) {
      characters.push(numbers[i]);
    }
  }

  // symbols if toggled
  if (withSymbols.checked) {
    for (let i = 0; i < symbols.length; i++) {
      characters.push(symbols[i]);
    }
  }
}

withNumbers.onchange = passwordArray;
withSymbols.onchange = passwordArray;

function generatePassword() {
  firstPassword.textContent = "";
  secondPassword.textContent = "";

  let passwordLength = slider.value;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex1 = Math.floor(Math.random() * characters.length);
    firstPassword.textContent += characters[randomIndex1];

    const randomIndex2 = Math.floor(Math.random() * characters.length);
    secondPassword.textContent += characters[randomIndex2];
  }
}

function copyPasswordOne() {
  if (!firstPassword.textContent) {
    alert("Generate a password first!");
    return;
  }
  navigator.clipboard.writeText(firstPassword.textContent);
  alert("Password copied: " + firstPassword.textContent);
}

function copyPasswordTwo() {
  if (!secondPassword.textContent) {
    alert("Generate a password first!");
    return;
  }
  navigator.clipboard.writeText(secondPassword.textContent);
  alert("Password copied: " + secondPassword.textContent);
}

passwordArray();
