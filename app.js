// ======================================
// FlyDNA Application v3.1
// Compact Widget
// Global BFH Universe Contribution Status
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


window.TRACK_TITLE =
    TRACK_TITLE;


// ======================================
// ANONYMOUS VISITOR ID
// ======================================

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

        }
        else {

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
// GLOBAL BFH CONTRIBUTION STATUS
// ======================================

const FLYDNA_CONTRIBUTED_KEY =
    "flydna_has_contributed";


function hasContributedToUniverse() {

    try {

        return (
            localStorage.getItem(
                FLYDNA_CONTRIBUTED_KEY
            ) === "true"
        );

    }
    catch (error) {

        console.error(
            "FlyDNA → localStorage read failed:",
            error
        );

        return false;

    }

}


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
// INTENSITY DISPLAY
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
// SHOW ALREADY PART OF UNIVERSE
// ======================================

function showUniverseMemberState() {

    console.log(
        "FlyDNA → visitor already belongs to BFH Universe"
    );


    if (
        typeof renderAlreadySubmitted ===
        "function"
    ) {

        renderAlreadySubmitted();

    }

}


// ======================================
// INITIALISE APPLICATION
// ======================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "=========================================="
        );

        console.log(
            "FLYDNA APPLICATION START"
        );

        console.log(
            "Track:",
            TRACK_TITLE
        );

        console.log(
            "Track ID:",
            TRACK_ID
        );

        console.log(
            "Global contribution:",
            hasContributedToUniverse()
        );

        console.log(
            "=========================================="
        );


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


        // ==================================
        // IMPORTANT:
        // CHECK GLOBAL STATUS FIRST
        // ==================================

        if (
            hasContributedToUniverse()
        ) {

            showUniverseMemberState();

        }

        else {

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

        }


        // ==================================
        // API INITIALISATION
        // ==================================

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


        // ==================================
        // REQUEST AGGREGATE
        // ==================================

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
    // Capture selection
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
    // Send to Wix
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
