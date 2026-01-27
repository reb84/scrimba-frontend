const convertBtn = document.getElementById("convert-btn");
const convertInput = document.getElementById("conversion-input");
const lengthResult = document.getElementById("length-result");
const volumeResult = document.getElementById("volume-result");
const massResult = document.getElementById("mass-result");

function convertLength(value) {
  const metresToFeet = (value * 3.28084).toFixed(3);
  const feetToMetres = (value / 3.28084).toFixed(3);
  return `${value} metres = ${metresToFeet} feet | ${convertInput.value} feet = ${feetToMetres} metres`;
}

function convertVolume(value) {
  const litresToGallons = (value * 0.264172).toFixed(3);
  const gallonsToLitres = (value / 0.264172).toFixed(3);
  return `${convertInput.value} litres = ${litresToGallons} gallons | ${convertInput.value} gallons = ${gallonsToLitres} litres`;
}

function convertMass(value) {
  const kgToPounds = (value * 2.20462).toFixed(3);
  const poundsToKg = (value / 2.20462).toFixed(3);
  return `${convertInput.value} kilos = ${kgToPounds} pounds | ${convertInput.value} pounds = ${poundsToKg} kilos`;
}

convertBtn.addEventListener("click", function () {
  const inputValue = parseFloat(convertInput.value);

  lengthResult.textContent = convertLength(inputValue);
  volumeResult.textContent = convertVolume(inputValue);
  massResult.textContent = convertMass(inputValue);
});
