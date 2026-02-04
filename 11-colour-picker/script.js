const submitBtn = document.getElementById("submit-btn");
const displayScheme = document.getElementById("display-scheme");
const displayHex = document.getElementById("display-hex");

submitBtn.addEventListener("click", () => {
  const seedColor = document.getElementById("seed-colour").value.slice(1);
  const schemeValue = document.getElementById("scheme").value;

  console.log(seedColor);
  console.log(schemeValue);

  getColors(seedColor, schemeValue);
});

const getColors = (seedColor, schemeValue) => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeValue}`,
  )
    .then((res) => res.json())
    .then((data) => render(data));
};

const render = (data) => {
displayScheme.innerHTML = data.colors
  .map((color) => {
    return `
      <div class="color-card">
        <img src="${color.image.bare}">
        <p>${color.hex.value}</p>
      </div>
    `;
  })
  .join("");
};
