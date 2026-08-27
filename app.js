// ======================================
// FlyDNA Application
// ======================================

const params = new URLSearchParams(window.location.search);

const TRACK_ID = params.get("track") || "unknown";
const TRACK_TITLE = decodeURIComponent(params.get("title") || "Unknown Track");
const SOURCE = params.get("source") || "music";

window.onload = () => {

    document.getElementById("app").innerHTML = `

<div class="flydna-card">

    <h1>🧬 FlyDNA</h1>

    <div class="subtitle">
        How deeply did this music move you?
    </div>

    <div class="section">
        <h2>${TRACK_TITLE}</h2>
    </div>

    <div class="section">

        <h2>Your Emotional Impact</h2>

        <div id="intensityValue" class="intensityValue"></div>

        <div class="slider">
            <input
                type="range"
                id="intensity"
                min="1"
                max="10"
                value="5">
        </div>

    </div>

    <div class="section">

        <h2>Choose emotions</h2>

        <div
            id="emotionContainer"
            class="emotions">
        </div>

    </div>

    <button id="submitBtn">
        SHARE MY DNA
    </button>

    <div class="stats">

        <div class="stat">
            <span>Average</span>
            <strong id="fd-intensity">-</strong>
        </div>

        <div class="stat">
            <span>Responses</span>
            <strong id="fd-total">0</strong>
        </div>

        <div class="stat">
            <span>Dominant</span>
            <strong id="fd-dominant">-</strong>
        </div>

        <div id="fd-breakdown"></div>

    </div>

</div>

`;

    renderEmotions();

    const slider = document.getElementById("intensity");

    const intensityLabels = {

        1: {
            emoji: "😐",
            text: "No Emotional Impact",
            color: "#777777"
        },

        2: {
            emoji: "🙂",
            text: "Slightly Touched",
            color: "#8b8b8b"
        },

        3: {
            emoji: "😊",
            text: "Pleasant",
            color: "#55c4ff"
        },

        4: {
            emoji: "❤️",
            text: "Emotionally Connected",
            color: "#3ea8ff"
        },

        5: {
            emoji: "🔥",
            text: "Strong Impact",
            color: "#1f8fff"
        },

        6: {
            emoji: "✨",
            text: "Deep Impact",
            color: "#0077ff"
        },

        7: {
            emoji: "💥",
            text: "Powerful",
            color: "#8d5cff"
        },

        8: {
            emoji: "🚀",
            text: "Exceptional",
            color: "#b45cff"
        },

        9: {
            emoji: "🤯",
            text: "Unforgettable",
            color: "#f4b400"
        },

        10: {
            emoji: "🧬",
            text: "Changed Me",
            color: "#ffd700"
        }

    };

    function updateIntensity() {

        const value = Number(slider.value);

        const level = intensityLabels[value];

        document.getElementById("intensityValue").innerHTML = `

<div style="font-size:40px">
${level.emoji}
</div>

<div style="font-size:34px;font-weight:bold;margin-top:6px;color:${level.color}">
${value} / 10
</div>

<div style="font-size:16px;color:${level.color};margin-top:8px">
${level.text}
</div>

`;

        slider.style.accentColor = level.color;

    }

    slider.oninput = updateIntensity;

    updateIntensity();

    document
        .getElementById("submitBtn")
        .onclick = () => {

            submitVote({

                trackId: TRACK_ID,

                title: TRACK_TITLE,

                source: SOURCE,

                intensity: Number(slider.value),

                emotions: selectedEmotions

            });

        };

    requestAggregate(TRACK_ID, SOURCE);

};
