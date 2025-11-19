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

// API pública - fato de gato + tradução PT-BR
const res = await fetch("https://catfact.ninja/fact");
const data = await res.json();

// Traduzir para português usando LibreTranslate
const translateRes = await fetch("https://libretranslate.de/translate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    q: data.fact,
    source: "en",
    target: "pt"
  })
});

const translated = await translateRes.json();
factText.textContent = "🐈 Fato: " + translated.translatedText;

// Registrar service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
