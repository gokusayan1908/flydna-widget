const EMOTIONS = [

    "❤️ Love",
    "😊 Happiness",
    "🔥 Energy",
    "😌 Calm",
    "🌌 Dreamy",
    "💃 Dance",
    "🚗 Roadtrip",
    "💪 Motivation",
    "😢 Sadness",
    "🤔 Reflection",
    "⚡ Power",
    "🎬 Cinematic",
    "🌍 Adventure",
    "✨ Hope",
    "🎉 Celebration",
    "🌙 Night Vibes"

];

let selectedEmotions = [];

function renderEmotions() {

    const container = document.getElementById("emotionContainer");

    if (!container) return;

    container.innerHTML = "";

    EMOTIONS.forEach(emotion => {

        const chip = document.createElement("div");

        chip.className = "emotion";

        chip.innerText = emotion;

        chip.onclick = () => {

            if (selectedEmotions.includes(emotion)) {

                selectedEmotions =
                    selectedEmotions.filter(e => e !== emotion);

                chip.classList.remove("selected");

            } else {

                selectedEmotions.push(emotion);

                chip.classList.add("selected");

            }

        };

        container.appendChild(chip);

    });

}
