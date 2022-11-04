import { triggerModal } from "./utils.js";

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

document.getElementById("close-modal-btn").addEventListener("click", () => {
  triggerModal();
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
        let targetDisplay = document.getElementById(`display-${i}`);
        let targetCode = document.getElementById(`color-code-${i}`);
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
  let text = e.target.classList[1];

  // navigator.clipboard.writeText(`${text}`);
  // alert(`${text}`);
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyContent();
});
