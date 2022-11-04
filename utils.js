function triggerModal() {
  document.getElementById("warning-modal").classList.toggle("hidden");
}

function triggerAlert() {
  document.getElementById("copy-modal").classList.toggle("hidden");
}

export { triggerModal, triggerAlert };
