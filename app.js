// ======================================
// FlyDNA Application v1.0
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
        What impact did this experience have on you?
    </div>

    <div class="section">

        <h2>${TRACK_TITLE}</h2>

    </div>

    <div class="section">

        <h2>Emotional Impact</h2>

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

        <h2>What did you feel?</h2>

        <p class="emotion-help">
            Select up to <strong>3</strong> emotions that best describe your experience.
        </p>

        <div
            id="emotionContainer"
            class="emotions">
        </div>

    </div>

    <button id="submitBtn">

        🧬 Contribute Your DNA to the Community

    </button>

    <div class="stats">

        <div class="stat">

            <span>Community Contributors</span>

            <strong id="fd-total">0</strong>

        </div>

        <div class="stat">

            <span>Average Emotional Impact</span>

            <strong id="fd-intensity">0 / 10</strong>

        </div>

        <div class="stat">

            <span>Community Emotional DNA</span>

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

    function updateIntensity() {

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

    const submitBtn = document.getElementById("submitBtn");

    // ====================================================
    // Receive response from Wix
    // ====================================================

    window.addEventListener("message", function(event) {

        if (!event.data) {
            return;
        }

        // --------------------------------------------
        // Successful submission
        // --------------------------------------------

        if (event.data.type === "submitSuccess") {

            submitBtn.disabled = true;

            submitBtn.innerHTML = `
                ✅ Thank you!
            `;

            return;
        }

        // --------------------------------------------
        // Already submitted
        // --------------------------------------------

        if (event.data.type === "alreadySubmitted") {

            submitBtn.disabled = true;

            submitBtn.innerHTML = `
                ✅ Already submitted
            `;

            return;
        }

        // --------------------------------------------
        // Submission error
        // --------------------------------------------

        if (event.data.type === "submitError") {

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
                🧬 Contribute Your DNA to the Community
            `;

            return;
        }

    });

    // ====================================================
    // Submit Vote
    // ====================================================

    submitBtn.onclick = () => {

        // Prevent multiple submissions
        if (submitBtn.disabled) {
            return;
        }

        // Prevent submission without emotions
        if (
            typeof selectedEmotions === "undefined" ||
            selectedEmotions.length === 0
        ) {
            return;
        }

        // Lock immediately
        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            ⏳ Submitting...
        `;

        // Send submission to Wix page
        window.parent.postMessage({

            type: "submit",

            payload: {

                trackId: TRACK_ID,

                title: TRACK_TITLE,

                type: ENTITY_TYPE,

                intensity: Number(slider.value),

                emotions: selectedEmotions.slice()

            }

        }, "*");

    };

    // ====================================================
    // Request Community DNA
    // ====================================================

    requestAggregate(TRACK_ID, ENTITY_TYPE);

};
