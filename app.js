// ======================================
// FlyDNA Application
// ======================================

const params = new URLSearchParams(window.location.search);

const TRACK_ID = params.get("track") || "unknown";
const TRACK_TITLE = decodeURIComponent(params.get("title") || "Unknown Track");
const ENTITY_TYPE = params.get("type") || "music";

window.onload = () => {

    document.getElementById("app").innerHTML = `

<div class="flydna-card">

    <h1>🧬 FlyDNA</h1>

    <div class="subtitle">
        How deeply did this ${ENTITY_TYPE} move you?
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

        <h2>Choose your emotions</h2>

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

            <span>Total Responses</span>

            <strong id="fd-total">0</strong>

        </div>

        <div class="stat">

            <span>Average Emotional Impact</span>

            <strong id="fd-intensity">0 / 10</strong>

        </div>

        <div class="stat">

            <span>Dominant Emotion</span>

            <strong id="fd-dominant">-</strong>

        </div>

        <div id="fd-breakdown"></div>

    </div>

</div>

`;

    renderEmotions();

    const slider = document.getElementById("intensity");

    const intensityLabels = {

        1:{emoji:"😐",text:"No Emotional Impact",color:"#808080"},
        2:{emoji:"🙂",text:"Slightly Touched",color:"#9ca3af"},
        3:{emoji:"😊",text:"Pleasant",color:"#38bdf8"},
        4:{emoji:"❤️",text:"Emotionally Connected",color:"#3b82f6"},
        5:{emoji:"🔥",text:"Strong Impact",color:"#2563eb"},
        6:{emoji:"✨",text:"Deep Impact",color:"#0ea5e9"},
        7:{emoji:"💥",text:"Powerful",color:"#7c3aed"},
        8:{emoji:"🚀",text:"Exceptional",color:"#9333ea"},
        9:{emoji:"🤯",text:"Unforgettable",color:"#f59e0b"},
        10:{emoji:"🧬",text:"Changed Me",color:"#facc15"}

    };

    function updateIntensity(){

        const value = Number(slider.value);

        const level = intensityLabels[value];

        document.getElementById("intensityValue").innerHTML = `

<div style="font-size:42px">${level.emoji}</div>

<div style="font-size:34px;font-weight:bold;color:${level.color}">
${value} / 10
</div>

<div style="margin-top:8px;color:${level.color};font-size:16px">
${level.text}
</div>

`;

        slider.style.accentColor = level.color;

    }

    slider.oninput = updateIntensity;

    updateIntensity();

    initialiseVoting(TRACK_ID, ENTITY_TYPE);

    document
        .getElementById("submitBtn")
        .onclick = () => {

            submitVote({

                trackId: TRACK_ID,

                title: TRACK_TITLE,

                type: ENTITY_TYPE,

                intensity: Number(slider.value),

                emotions: selectedEmotions

            });

        };

    requestAggregate(TRACK_ID, ENTITY_TYPE);

};
