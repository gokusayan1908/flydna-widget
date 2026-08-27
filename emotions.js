const EMOTIONS = [
    "😊 Happy",
    "❤️ Love",
    "🔥 Energy",
    "💙 Nostalgic",
    "😌 Calm",
    "🌌 Dreamy",
    "💪 Powerful",
    "🌞 Hopeful",
    "🎉 Excited",
    "🥲 Emotional",
    "🌙 Melancholy",
    "⚡ Motivated",
    "🕺 Dance",
    "🚀 Epic",
    "✨ Inspired",
    "🤯 Surprised"
];

let selectedEmotions = [];

const container = document.getElementById("emotionContainer");

EMOTIONS.forEach(emotion => {

    const button = document.createElement("div");

    button.className = "emotion";

    button.innerText = emotion;

    button.onclick = () => {

        if (selectedEmotions.includes(emotion)) {

            selectedEmotions =
                selectedEmotions.filter(e => e !== emotion);

            button.classList.remove("selected");

        } else {

            selectedEmotions.push(emotion);

            button.classList.add("selected");

        }

    };

    container.appendChild(button);

});

window.getSelectedEmotions = () => selectedEmotions;
