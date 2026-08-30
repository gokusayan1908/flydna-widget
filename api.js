// ======================================
// FlyDNA API Bridge v3.0
// ======================================

let voteTrackId = "";
let voteType = "";
let voteSessionId = "";


// ======================================
// Initialise
// ======================================

window.initialiseVoting = function(
    trackId,
    type,
    sessionId
) {

    voteTrackId = trackId;

    voteType = type;

    voteSessionId = sessionId || "";

    console.log(
        "FlyDNA API initialised:",
        {
            trackId: trackId,
            entityType: type,
            sessionId: voteSessionId
        }
    );

};


// ======================================
// Request Community DNA
// ======================================

window.requestAggregate = function(
    trackId,
    entityType,
    sessionId
) {

    const activeSessionId =
        sessionId || voteSessionId;


    console.log(
        "FlyDNA → requesting aggregate:",
        {
            trackId: trackId,
            entityType: entityType,
            sessionId: activeSessionId
        }
    );


    window.parent.postMessage({

        type: "getAggregate",

        trackId: trackId,

        entityType: entityType,

        sessionId: activeSessionId

    }, "*");

};


// ======================================
// Submit Vote
// ======================================

window.submitVote = function(vote) {

    console.log(
        "FlyDNA → sending submit to Wix:",
        vote
    );


    window.parent.postMessage({

        type: "submit",

        payload: vote

    }, "*");

};


// ======================================
// Receive messages from Wix
// ======================================

window.addEventListener(
    "message",
    (event) => {

        if (!event.data) {
            return;
        }


        console.log(
            "FlyDNA ← Wix:",
            event.data
        );


        const message =
            event.data;


        switch (message.type) {


            // ==================================
            // WIX READY
            // ==================================

            case "wixReady":

                console.log(
                    "FlyDNA ← Wix is ready"
                );


                window.requestAggregate(
                    voteTrackId,
                    voteType,
                    voteSessionId
                );

                break;


            // ==================================
            // COMMUNITY AGGREGATE
            // ==================================

            case "aggregate":

                console.log(
                    "FlyDNA aggregate received:",
                    message.data
                );


                const aggregate =
                    message.data;


                if (
                    aggregate &&
                    aggregate.alreadySubmitted === true
                ) {

                    console.log(
                        "FlyDNA → visitor already submitted"
                    );


                    if (
                        typeof renderAlreadySubmitted ===
                        "function"
                    ) {

                        renderAlreadySubmitted(
                            aggregate
                        );

                    }

                }
                else {

                    if (
                        typeof renderAggregate ===
                        "function"
                    ) {

                        renderAggregate(
                            aggregate
                        );

                    }

                }

                break;


            // ==================================
            // SUCCESSFUL SUBMISSION
            // ==================================

            case "submitSuccess":

                console.log(
                    "FlyDNA submission successful:",
                    message.data
                );


                if (
                    typeof renderSubmittedExperience ===
                    "function"
                ) {

                    renderSubmittedExperience(
                        message.data
                    );

                }

                break;


            // ==================================
            // ALREADY SUBMITTED
            // ==================================

            case "alreadySubmitted":

                console.log(
                    "FlyDNA → already submitted"
                );


                if (
                    typeof renderAlreadySubmitted ===
                    "function"
                ) {

                    renderAlreadySubmitted(
                        message.data
                    );

                }

                break;


            // ==================================
            // SUBMISSION ERROR
            // ==================================

            case "submitError":

                console.error(
                    "FlyDNA submission failed:",
                    message.data
                );


                const errorBtn =
                    document.getElementById(
                        "submitBtn"
                    );


                if (errorBtn) {

                    errorBtn.disabled =
                        false;


                    errorBtn.innerHTML =
                        "🧬 Contribute Your DNA to the Community";

                }

                break;


            // ==================================
            // UNKNOWN MESSAGE
            // ==================================

            default:

                break;

        }

    }
);
