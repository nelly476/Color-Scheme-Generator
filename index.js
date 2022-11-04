import { triggerModal, triggerAlert } from "./utils.js";

let length = document.getElementById("length").value;

document.getElementById("select").addEventListener("click", () => {
  length = document.getElementById("length").value;
  if (length > 15 || length < 1) {
    triggerModal();
  } else {
    render();
    showPalette();
  }
});

document
  .getElementById("close-modal-btn")
  .addEventListener("click", triggerModal);

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
  const color = document.getElementById("color").value.replace("#", "");
  const mode = document.getElementById("color-mode").value;
  const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=${length}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.colors.length; i++) {
        const color = data.colors[i].hex.value;
        const targetDisplay = document.getElementById(`display-${i}`);
        const targetCode = document.getElementById(`color-code-${i}`);
        targetDisplay.style.background = color;
        targetDisplay.classList.add(color);

        targetCode.textContent = color;
        targetCode.classList.add(color);
      }
    });
}

render();
showPalette();

document.getElementById("display-section").addEventListener("click", (e) => {
  const text = e.target.classList[1];
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      triggerAlert();
      setTimeout(triggerAlert, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyContent();
});
