const captureBtn = document.getElementById("capture-btn");
const factBtn = document.getElementById("fact-btn");
const video = document.getElementById("video");
const photo = document.getElementById("photo");
const factText = document.getElementById("fact-text");


// --------------------- CÂMERA ------------------------
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("Erro ao acessar a câmera: " + err.message);
    }
}


// ----------------- TIRAR FOTO ------------------------
captureBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    photo.src = canvas.toDataURL("image/png");
});


// ---------------- FATO + TRADUÇÃO --------------------
factBtn.addEventListener("click", async () => {
    factText.textContent = "Carregando fato sobre gatos...";

    try {
        const res = await fetch("https://catfact.ninja/fact");
        const data = await res.json();
        const original = data.fact;

        const translateURL =
            "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(original)}&langpair=en|pt-BR`
            );

        const tRes = await fetch(translateURL);
        const tData = await tRes.json();

        const translated = JSON.parse(tData.contents).responseData.translatedText;

        factText.textContent = "🐱 " + translated;
    } catch (err) {
        console.error(err);
        factText.textContent = "Erro ao carregar o fato.";
    }
});


// ------------- SERVICE WORKER (PWA) -------------------
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.log("Erro ao registrar:", err));
}

startCamera();
