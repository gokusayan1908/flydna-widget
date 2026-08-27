// ======================================
// FlyDNA Emotions v1.0
// ======================================

const emotions = [

    {
        name: "Love",
        emoji: "❤️"
    },

    {
        name: "Energy",
        emoji: "⚡"
    },

    {
        name: "Joy",
        emoji: "😊"
    },

    {
        name: "Sadness",
        emoji: "😢"
    },

    {
        name: "Nostalgia",
        emoji: "🌌"
    },

    {
        name: "Passion",
        emoji: "🔥"
    },

    {
        name: "Peace",
        emoji: "🕊️"
    },

    {
        name: "Hope",
        emoji: "✨"
    },

    {
        name: "Celebration",
        emoji: "🎉"
    },

    {
        name: "Cinematic",
        emoji: "🎬"
    }

];

let selectedEmotions = [];

// ======================================
// Render emotions
// ======================================

function renderEmotions() {

    const container = document.getElementById("emotionContainer");

    container.innerHTML = "";

    emotions.forEach((emotion) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "emotion-btn";

        button.innerHTML = `
            <span class="emoji">${emotion.emoji}</span>
            <span>${emotion.name}</span>
        `;

        button.onclick = () => {

            const index = selectedEmotions.indexOf(emotion.name);

            // ----------------------------------
            // Remove selection
            // ----------------------------------

            if (index !== -1) {

                selectedEmotions.splice(index, 1);

                button.classList.remove("selected");

                return;

            }

            // ----------------------------------
            // Maximum of 3 emotions
            // ----------------------------------

            if (selectedEmotions.length >= 3) {

                alert("Please select a maximum of 3 emotions.");

                return;

            }

            // ----------------------------------
            // Add selection
            // ----------------------------------

            selectedEmotions.push(emotion.name);

            button.classList.add("selected");

        };

        container.appendChild(button);

    });

}
