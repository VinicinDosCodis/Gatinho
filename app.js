// Selecionar elementos
const captureBtn = document.getElementById("capture-btn");
const factBtn = document.getElementById("fact-btn");
const video = document.getElementById("video");
const photo = document.getElementById("photo");
const factText = document.getElementById("fact-text");

// --- Inicializar Câmera ---
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        alert("Erro ao acessar a câmera: " + error.message);
    }
}

// --- Capturar Foto da Câmera ---
captureBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    photo.src = canvas.toDataURL("image/png");
});

// --- Buscar Fato de Gato e Traduzir para PT-BR ---
factBtn.addEventListener("click", async () => {
    factText.textContent = "Carregando fato...";

    try {
        // 1. API pública com fatos sobre gatos
        const res = await fetch("https://catfact.ninja/fact");
        const data = await res.json();

        // 2. Traduzir automaticamente para Português
        const translateURL =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.fact)}&langpair=en|pt-BR`;

        const tRes = await fetch(translateURL);
        const tData = await tRes.json();

        factText.textContent = "🐈 Fato: " + tData.responseData.translatedText;
    } catch (error) {
        factText.textContent = "❌ Erro ao carregar o fato.";
        console.error(error);
    }
});

// --- Registrar o Service Worker ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("Service Worker registrado"))
            .catch(err => console.log("Erro no Service Worker:", err));
    });
}

// Iniciar a câmera ao carregar
startCamera();
