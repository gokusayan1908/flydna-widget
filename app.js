// ======================================
// FlyDNA Application v3.0
// Compact Widget
// Persistent Anonymous Visitor ID
// ======================================


// ======================================
// TRACK CONTEXT
// ======================================

const params =
    new URLSearchParams(
        window.location.search
    );


const TRACK_ID =
    params.get("track") || "unknown";


const TRACK_TITLE =
    decodeURIComponent(
        params.get("title") || "Unknown Track"
    );


const ENTITY_TYPE =
    params.get("type") || "music";


// Make title available to renderer.js

window.TRACK_TITLE =
    TRACK_TITLE;


// ======================================
// ANONYMOUS VISITOR / SESSION ID
// ======================================
//
// One anonymous ID is created per browser.
// It is stored locally and reused on future visits.
//
// This is NOT personal information.
// It is only used to enforce one FlyDNA
// response per visitor per track.
//

const FLYDNA_SESSION_KEY =
    "flydna_visitor_id";


function getFlyDNASessionId() {

    let sessionId =
        localStorage.getItem(
            FLYDNA_SESSION_KEY
        );


    if (!sessionId) {

        if (
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
        ) {

            sessionId =
                crypto.randomUUID();

        } else {

            sessionId =
                "flydna-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 15);

        }


        localStorage.setItem(
            FLYDNA_SESSION_KEY,
            sessionId
        );

    }


    return sessionId;

}


const SESSION_ID =
    getFlyDNASessionId();


console.log(
    "FlyDNA visitor ID:",
    SESSION_ID
);


// ======================================
// STATE
// ======================================

let submittedIntensity = null;

let submittedEmotions = [];


// ======================================
// INTENSITY LABELS
// ======================================

const intensityLabels = {

    1: {
        emoji: "😐",
        text: "No Emotional Impact"
    },

    2: {
        emoji: "🙂",
        text: "Slightly Touched"
    },

    3: {
        emoji: "😊",
        text: "Pleasant"
    },

    4: {
        emoji: "❤️",
        text: "Emotionally Connected"
    },

    5: {
        emoji: "🔥",
        text: "Strong Impact"
    },

    6: {
        emoji: "✨",
        text: "Deep Impact"
    },

    7: {
        emoji: "💥",
        text: "Powerful"
    },

    8: {
        emoji: "🚀",
        text: "Exceptional"
    },

    9: {
        emoji: "🤯",
        text: "Unforgettable"
    },

    10: {
        emoji: "🧬",
        text: "Changed Me"
    }

};


// ======================================
// UPDATE INTENSITY DISPLAY
// ======================================

function updateIntensity() {

    const slider =
        document.getElementById(
            "intensity"
        );


    const display =
        document.getElementById(
            "intensityValue"
        );


    if (!slider || !display) {
        return;
    }


    const value =
        Number(slider.value);


    const level =
        intensityLabels[value];


    if (!level) {
        return;
    }


    display.innerHTML = `

        <div class="intensity-score">

            ${level.emoji}

            <strong>
                ${value} / 10
            </strong>

        </div>

        <div class="intensity-description">
            ${level.text}
        </div>

    `;

}


// ======================================
// INITIALISE APPLICATION
// ======================================

window.addEventListener(
    "DOMContentLoaded",
    () => {


        // ----------------------------------
        // Track title
        // ----------------------------------

        const trackTitle =
            document.getElementById(
                "trackTitle"
            );


        if (trackTitle) {

            trackTitle.textContent =
                TRACK_TITLE;

        }


        // ----------------------------------
        // Render emotions
        // ----------------------------------

        if (
            typeof renderEmotions ===
            "function"
        ) {

            renderEmotions();

        }


        // ----------------------------------
        // Intensity slider
        // ----------------------------------

        const slider =
            document.getElementById(
                "intensity"
            );


        if (slider) {

            slider.addEventListener(
                "input",
                updateIntensity
            );


            updateIntensity();

        }


        // ----------------------------------
        // Submit button
        // ----------------------------------

        const submitBtn =
            document.getElementById(
                "submitBtn"
            );


        if (submitBtn) {

            submitBtn.addEventListener(
                "click",
                handleSubmit
            );

        }


        // ----------------------------------
        // Initialise API
        // ----------------------------------

        if (
            typeof initialiseVoting ===
            "function"
        ) {

            initialiseVoting(
                TRACK_ID,
                ENTITY_TYPE,
                SESSION_ID
            );

        }


        // ----------------------------------
        // Request community aggregate
        // ----------------------------------

        if (
            typeof requestAggregate ===
            "function"
        ) {

            requestAggregate(
                TRACK_ID,
                ENTITY_TYPE,
                SESSION_ID
            );

        }

    }
);


// ======================================
// SUBMIT VOTE
// ======================================

function handleSubmit() {

    const slider =
        document.getElementById(
            "intensity"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    if (!slider || !submitBtn) {
        return;
    }


    // ----------------------------------
    // Check emotions
    // ----------------------------------

    if (
        typeof selectedEmotions ===
            "undefined" ||
        selectedEmotions.length === 0
    ) {

        const status =
            document.getElementById(
                "status"
            );


        if (status) {

            status.textContent =
                "Please select at least one emotion.";

        }


        return;

    }


    // ----------------------------------
    // Capture visitor selection
    // ----------------------------------

    submittedIntensity =
        Number(slider.value);


    submittedEmotions =
        selectedEmotions.slice();


    // ----------------------------------
    // Disable button
    // ----------------------------------

    submitBtn.disabled =
        true;


    submitBtn.textContent =
        "⏳ Adding your DNA...";


    // ----------------------------------
    // Build vote
    // ----------------------------------

    const vote = {

        trackId:
            TRACK_ID,

        title:
            TRACK_TITLE,

        type:
            ENTITY_TYPE,

        intensity:
            submittedIntensity,

        emotions:
            submittedEmotions,

        sessionId:
            SESSION_ID

    };


    console.log(
        "FlyDNA → vote prepared:",
        vote
    );


    // ----------------------------------
    // Send through API bridge
    // ----------------------------------

    if (
        typeof submitVote ===
        "function"
    ) {

        submitVote(vote);

    }
    else {

        console.error(
            "FlyDNA: submitVote() unavailable"
        );


        submitBtn.disabled =
            false;


        submitBtn.textContent =
            "🧬 Contribute Your DNA to the Community";

    }

}
