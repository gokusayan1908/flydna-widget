// ======================================
// FlyDNA Emotions v1.3
// 4-column compact layout
// ======================================

const EMOTIONS = [
    {
        id: "love",
        label: "Love",
        emoji: "❤️"
    },
    {
        id: "energy",
        label: "Energy",
        emoji: "⚡"
    },
    {
        id: "joy",
        label: "Joy",
        emoji: "😊"
    },
    {
        id: "sadness",
        label: "Sadness",
        emoji: "😢"
    },
    {
        id: "nostalgia",
        label: "Nostalgia",
        emoji: "🌌"
    },
    {
        id: "passion",
        label: "Passion",
        emoji: "🔥"
    },
    {
        id: "peace",
        label: "Peace",
        emoji: "🕊️"
    },
    {
        id: "hope",
        label: "Hope",
        emoji: "✨"
    },
    {
        id: "celebration",
        label: "Celebration",
        emoji: "🎉"
    },
    {
        id: "cinematic",
        label: "Cinematic",
        emoji: "🎬"
    }
];

const MAX_EMOTIONS = 3;

let selectedEmotions = [];


// ======================================
// Render emotions
// ======================================

function renderEmotions() {

    const container =
        document.getElementById("emotionContainer");

    if (!container) {

        console.error(
            "FlyDNA: emotionContainer not found"
        );

        return;
    }


    // ==================================
    // 4 COLUMNS
    // ==================================

    container.style.display = "grid";

    container.style.gridTemplateColumns =
        "repeat(4, minmax(0, 1fr))";

    container.style.gap = "5px";

    container.style.width = "100%";

    container.style.boxSizing = "border-box";


    // Clear existing buttons

    container.innerHTML = "";


    // ==================================
    // CREATE EMOTION BUTTONS
    // ==================================

    EMOTIONS.forEach(emotion => {

        const button =
            document.createElement("button");


        button.type = "button";


        button.className =
            "emotion-btn";


        button.dataset.emotion =
            emotion.label;


        button.innerHTML = `
            <span class="emotion-emoji">
                ${emotion.emoji}
            </span>

            <span class="emotion-name">
                ${emotion.label}
            </span>
        `;


        button.addEventListener(
            "click",
            () => toggleEmotion(
                emotion.label,
                button
            )
        );


        container.appendChild(button);

    });


    updateEmotionCounter();


    console.log(
        "FlyDNA emotions rendered:",
        EMOTIONS.length,
        "in 4-column layout"
    );
}


// ======================================
// Toggle emotion
// ======================================

function toggleEmotion(
    emotion,
    button
) {

    const index =
        selectedEmotions.indexOf(emotion);


    // ----------------------------------
    // Already selected → remove
    // ----------------------------------

    if (index !== -1) {

        selectedEmotions.splice(
            index,
            1
        );


        button.classList.remove(
            "selected"
        );


        updateEmotionCounter();

        return;
    }


    // ----------------------------------
    // Maximum reached
    // ----------------------------------

    if (
        selectedEmotions.length >=
        MAX_EMOTIONS
    ) {

        return;
    }


    // ----------------------------------
    // Add emotion
    // ----------------------------------

    selectedEmotions.push(
        emotion
    );


    button.classList.add(
        "selected"
    );


    updateEmotionCounter();
}


// ======================================
// Selection counter
// ======================================

function updateEmotionCounter() {

    const counter =
        document.getElementById(
            "emotionCounter"
        );


    if (!counter) {

        return;
    }


    const count =
        selectedEmotions.length;


    counter.textContent =
        `${count} of ${MAX_EMOTIONS} emotions selected`;
}
