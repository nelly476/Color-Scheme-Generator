import { displayModal, hideModal } from "./utils.js";

let length = document.getElementById("length").value;

document.getElementById("select").addEventListener("click", () => {
  length = document.getElementById("length").value;
  if (length > 15 || length < 1) {
    displayModal();
  } else {
    render();
    showPalette();
  }
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
  hideModal();
});

function render() {
  let colorBlockHtml = "";

  for (let i = 0; i < length; i++) {
    colorBlockHtml += `
<div class="color-section">
<div id="display-${i}" class="display"></div>
<div id="color-code-${i}" class="color-code"></div>
</div>`;
  }
  document.getElementById("display-section").innerHTML = colorBlockHtml;
}

function showPalette() {
  let color = document.getElementById("color").value.replace("#", "");
  let mode = document.getElementById("color-mode").value;
  let url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=${length}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.colors.length; i++) {
        let color = data.colors[i].hex.value;
        document.getElementById(`display-${i}`).style.background = color;

        document.getElementById(`color-code-${i}`).textContent = color;
      }
    });
}

render();
showPalette();
