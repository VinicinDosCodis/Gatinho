// Iniciar câmera
const video = document.getElementById("camera");
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream);

// Capturar foto
const button = document.getElementById("btn-capture");
const canvas = document.getElementById("canvas");
const factText = document.getElementById("fact");

button.addEventListener("click", async () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);
  canvas.style.display = "block";

  // API pública - fato de gato
  const res = await fetch("https://catfact.ninja/fact");
  const data = await res.json();
  factText.textContent = "🐈 Fato: " + data.fact;
});

// Registrar service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
