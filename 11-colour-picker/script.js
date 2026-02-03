const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  const seedColor = document.getElementById("seed-colour").value.slice(1);
  const schemeValue = document.getElementById("scheme").value;

  console.log(seedColor);
  console.log(schemeValue);

  getColors(seedColor, schemeValue);
});

getColors = (seedColor, schemeValue) => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeValue}`,
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
};
