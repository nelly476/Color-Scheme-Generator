document.getElementById("select").addEventListener("click", () => {
  let color = document.getElementById("color").value.replace("#", "");
  let url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=monochrome&count=6`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let targetColor = data.colors[0].hex.value;
      document.getElementById("display-1").style.background = targetColor;
    });
});

//
//
