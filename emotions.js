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

    if (!container) {

        console.error("FlyDNA: emotionContainer not found");

        return;

    }

    container.innerHTML = "";

    selectedEmotions = [];

    emotions.forEach((emotion) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "emotion-btn";

        button.dataset.emotion = emotion.name;

        button.innerHTML = `
            <span class="emoji">${emotion.emoji}</span>
            <span>${emotion.name}</span>
        `;

        // ----------------------------------
        // Base appearance
        // ----------------------------------

        button.style.cursor = "pointer";
        button.style.transition = "all 0.2s ease";
        button.style.border = "1px solid rgba(255,255,255,0.15)";
        button.style.background = "rgba(255,255,255,0.06)";
        button.style.color = "#ffffff";
        button.style.padding = "12px 18px";
        button.style.borderRadius = "12px";
        button.style.fontSize = "15px";
        button.style.fontWeight = "500";

        // ----------------------------------
        // Click
        // ----------------------------------

        button.addEventListener("click", function () {

            console.log(
                "FlyDNA emotion clicked:",
                emotion.name
            );

            const index =
                selectedEmotions.indexOf(emotion.name);

            // ----------------------------------
            // Deselect
            // ----------------------------------

            if (index !== -1) {

                selectedEmotions.splice(index, 1);

                button.style.background =
                    "rgba(255,255,255,0.06)";

                button.style.border =
                    "1px solid rgba(255,255,255,0.15)";

                button.style.transform =
                    "scale(1)";

                return;

            }

            // ----------------------------------
            // Maximum 3
            // ----------------------------------

            if (selectedEmotions.length >= 3) {

                console.log(
                    "FlyDNA: maximum of 3 emotions reached"
                );

                return;

            }

            // ----------------------------------
            // Select
            // ----------------------------------

            selectedEmotions.push(emotion.name);

            button.style.background =
                "linear-gradient(135deg, #2563eb, #7c3aed)";

            button.style.border =
                "1px solid rgba(255,255,255,0.5)";

            button.style.transform =
                "scale(1.03)";

            console.log(
                "FlyDNA selected emotions:",
                selectedEmotions
            );

        });

        container.appendChild(button);

    });

    console.log(
        "FlyDNA emotions rendered:",
        emotions.length
    );

}
