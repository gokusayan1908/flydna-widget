// ======================================
// FlyDNA Application v1.0
// ======================================

const params = new URLSearchParams(window.location.search);

const TRACK_ID = params.get("track") || "unknown";
const TRACK_TITLE = decodeURIComponent(params.get("title") || "Unknown Track");
const ENTITY_TYPE = params.get("type") || "music";

let submittedIntensity = null;
let submittedEmotions = [];
let latestAggregate = null;

window.onload = () => {

    document.getElementById("app").innerHTML = `

<div class="flydna-card">

    <h1>🧬 FlyDNA</h1>

    <div class="subtitle">
        What impact did this experience have on you?
    </div>

    <div class="section track-section">

        <h2>${TRACK_TITLE}</h2>

    </div>

    <div class="section" id="impactSection">

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

    <div class="section" id="emotionSection">

        <h2>What did you feel?</h2>

        <p class="emotion-help">
            Select up to <strong>3</strong> emotions that best describe your experience.
        </p>

        <div
            id="emotionContainer"
            class="emotions">
        </div>

    </div>

    <div id="communityResult"></div>

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

        1: {
            emoji: "😐",
            text: "No Emotional Impact",
            color: "#808080"
        },

        2: {
            emoji: "🙂",
            text: "Slightly Touched",
            color: "#9ca3af"
        },

        3: {
            emoji: "😊",
            text: "Pleasant",
            color: "#38bdf8"
        },

        4: {
            emoji: "❤️",
            text: "Emotionally Connected",
            color: "#3b82f6"
        },

        5: {
            emoji: "🔥",
            text: "Strong Impact",
            color: "#2563eb"
        },

        6: {
            emoji: "✨",
            text: "Deep Impact",
            color: "#0ea5e9"
        },

        7: {
            emoji: "💥",
            text: "Powerful",
            color: "#7c3aed"
        },

        8: {
            emoji: "🚀",
            text: "Exceptional",
            color: "#9333ea"
        },

        9: {
            emoji: "🤯",
            text: "Unforgettable",
            color: "#f59e0b"
        },

        10: {
            emoji: "🧬",
            text: "Changed Me",
            color: "#facc15"
        }

    };

    function updateIntensity() {

        const value = Number(slider.value);

        const level = intensityLabels[value];

        document.getElementById("intensityValue").innerHTML = `

<div style="font-size:42px">
    ${level.emoji}
</div>

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
    // Receive messages from Wix
    // ====================================================

    window.addEventListener("message", function(event) {

        if (!event.data || !event.data.type) {
            return;
        }

        console.log("FlyDNA ← Wix", event.data);

        // ------------------------------------------------
        // Successful submission
        // ------------------------------------------------

        if (event.data.type === "submitSuccess") {

            showCommunityResult();

            return;
        }

        // ------------------------------------------------
        // Already submitted
        // ------------------------------------------------

        if (event.data.type === "alreadySubmitted") {

            showAlreadySubmitted();

            return;
        }

        // ------------------------------------------------
        // Aggregate received
        // ------------------------------------------------

        if (event.data.type === "aggregate") {

            latestAggregate = event.data.data;

            updateCommunityStats(latestAggregate);

            return;
        }

        // ------------------------------------------------
        // Submission error
        // ------------------------------------------------

        if (event.data.type === "submitError") {

            submitBtn.disabled = false;

            submitBtn.style.display = "block";

            submitBtn.textContent =
                "🧬 Contribute Your DNA to the Community";

            return;
        }

    });

    // ====================================================
    // Submit Vote
    // ====================================================

    submitBtn.onclick = () => {

        if (submitBtn.disabled) {
            return;
        }

        if (
            typeof selectedEmotions === "undefined" ||
            selectedEmotions.length === 0
        ) {
            return;
        }

        submittedIntensity = Number(slider.value);

        submittedEmotions = selectedEmotions.slice();

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            ⏳ Adding your DNA...
        `;

        // ====================================================
        // Send submission to Wix
        // ====================================================

        console.log("FlyDNA → sending submit to Wix");

        window.parent.postMessage({

            type: "submit",

            payload: {

                trackId: TRACK_ID,

                title: TRACK_TITLE,

                type: ENTITY_TYPE,

                intensity: submittedIntensity,

                emotions: submittedEmotions

            }

        }, "*");

        console.log("FlyDNA → postMessage executed");

    };

    // ====================================================
    // Request Community DNA
    // ====================================================

    requestAggregate(TRACK_ID, ENTITY_TYPE);

};


// ========================================================
// SHOW COMMUNITY RESULT AFTER NEW SUBMISSION
// ========================================================

function showCommunityResult() {

    const submitBtn =
        document.getElementById("submitBtn");

    const impactSection =
        document.getElementById("impactSection");

    const emotionSection =
        document.getElementById("emotionSection");

    const communityResult =
        document.getElementById("communityResult");

    if (impactSection) {
        impactSection.style.display = "none";
    }

    if (emotionSection) {
        emotionSection.style.display = "none";
    }

    if (submitBtn) {
        submitBtn.style.display = "none";
    }

    const emotionsText =
        submittedEmotions.length > 0
            ? submittedEmotions.join(" · ")
            : "Your emotional DNA";

    communityResult.innerHTML = `

<div class="community-result">

    <div class="community-title">
        🧬 Your DNA is now part of the universe
    </div>

    <div class="community-track">
        ${TRACK_TITLE}
    </div>

    <div class="your-dna">

        <div class="your-dna-title">
            YOUR EMOTIONAL DNA
        </div>

        <div class="your-score">
            ${submittedIntensity} / 10
        </div>

        <div class="your-emotions">
            ${emotionsText}
        </div>

    </div>

    <div class="community-heading">
        🌍 The Community Feeling
    </div>

</div>

`;

    updateCommunityStats(latestAggregate);

}


// ========================================================
// SHOW RESULT FOR A VISITOR WHO ALREADY SUBMITTED
// ========================================================

function showAlreadySubmitted() {

    const impactSection =
        document.getElementById("impactSection");

    const emotionSection =
        document.getElementById("emotionSection");

    const submitBtn =
        document.getElementById("submitBtn");

    const communityResult =
        document.getElementById("communityResult");

    if (impactSection) {
        impactSection.style.display = "none";
    }

    if (emotionSection) {
        emotionSection.style.display = "none";
    }

    if (submitBtn) {
        submitBtn.style.display = "none";
    }

    if (communityResult) {

        communityResult.innerHTML = `

<div class="community-result">

    <div class="community-title">
        🧬 Your DNA is already part of the universe
    </div>

    <div class="community-track">
        ${TRACK_TITLE}
    </div>

    <div class="community-heading">
        🌍 The Community Feeling
    </div>

</div>

`;

    }

    updateCommunityStats(latestAggregate);

}


// ========================================================
// UPDATE COMMUNITY STATS
// ========================================================

function updateCommunityStats(data) {

    if (!data) {
        return;
    }

    const total =
        Number(data.totalResponses || 0);

    const avg =
        Number(data.avgIntensity || 0);

    const dominant =
        data.dominantEmotion || "-";

    const totalElement =
        document.getElementById("fd-total");

    const intensityElement =
        document.getElementById("fd-intensity");

    const dominantElement =
        document.getElementById("fd-dominant");

    if (totalElement) {

        totalElement.textContent =
            total;

    }

    if (intensityElement) {

        intensityElement.textContent =
            `${avg} / 10`;

    }

    if (dominantElement) {

        dominantElement.textContent =
            dominant === "-"
                ? "-"
                : dominant;

    }

    renderBreakdown(data);

}


// ========================================================
// EMOTION BREAKDOWN
// ========================================================

function renderBreakdown(data) {

    const container =
        document.getElementById("fd-breakdown");

    if (!container) {
        return;
    }

    const breakdown =
        data.emotionBreakdown || {};

    const total =
        Number(data.totalResponses || 0);

    if (!total) {

        container.innerHTML = "";

        return;
    }

    const sorted =
        Object.entries(breakdown)
            .sort((a, b) => b[1] - a[1]);

    container.innerHTML =
        sorted.map(([emotion, count]) => {

            const percentage =
                Math.round((count / total) * 100);

            return `

<div class="emotion-result">

    <div class="emotion-result-label">

        <span>${emotion}</span>

        <strong>${percentage}%</strong>

    </div>

    <div class="emotion-result-bar">

        <div
            class="emotion-result-fill"
            style="width:${percentage}%">
        </div>

    </div>

</div>

`;

        }).join("");

}
