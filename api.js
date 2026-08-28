// ======================================
// FlyDNA API Bridge
// ======================================

let voteTrackId = "";
let voteType = "";


// --------------------------------------
// Initialise
// --------------------------------------

window.initialiseVoting = function(trackId, type) {

    voteTrackId = trackId;
    voteType = type;

    console.log("FlyDNA API initialised:", {
        trackId: trackId,
        entityType: type
    });

};


// --------------------------------------
// Request Community DNA
// --------------------------------------

window.requestAggregate = function(trackId, entityType) {

    console.log("FlyDNA → requesting aggregate:", {
        trackId: trackId,
        entityType: entityType
    });

    window.parent.postMessage({

        type: "getAggregate",

        trackId: trackId,

        entityType: entityType

    }, "*");

};


// --------------------------------------
// Submit Vote
// --------------------------------------

window.submitVote = function(vote) {

    console.log(
        "FlyDNA → sending submit to Wix",
        vote
    );

    window.parent.postMessage({

        type: "submit",

        payload: vote

    }, "*");

};


// --------------------------------------
// Receive messages from Wix
// --------------------------------------

window.addEventListener("message", (event) => {

    if (!event.data) {
        return;
    }

    console.log(
        "FlyDNA ← Wix",
        event.data
    );


    switch (event.data.type) {


        // ==================================
        // COMMUNITY AGGREGATE
        // ==================================

        case "aggregate":

            console.log(
                "FlyDNA aggregate received:",
                event.data.data
            );

            const aggregate =
                event.data.data;


            // --------------------------------
            // Visitor already contributed
            // --------------------------------

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


            // --------------------------------
            // Visitor has not contributed
            // --------------------------------

            else {

                renderAggregate(
                    aggregate
                );

            }

            break;


        // ==================================
        // SUCCESSFUL SUBMISSION
        // ==================================

        case "submitSuccess":

            console.log(
                "FlyDNA submission successful:",
                event.data.data
            );

            if (
                typeof renderSubmittedExperience ===
                "function"
            ) {

                renderSubmittedExperience(
                    event.data.data
                );

            }
            else {

                const submitBtn =
                    document.getElementById(
                        "submitBtn"
                    );

                if (submitBtn) {

                    submitBtn.innerHTML =
                        "✅ Your DNA is now part of the universe";

                    submitBtn.disabled = true;

                }

                if (event.data.data) {

                    renderAggregate(
                        event.data.data
                    );

                }

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

                renderAlreadySubmitted();

            }

            break;


        // ==================================
        // SUBMISSION ERROR
        // ==================================

        case "submitError":

            console.error(
                "FlyDNA submission failed"
            );

            const errorBtn =
                document.getElementById(
                    "submitBtn"
                );

            if (errorBtn) {

                errorBtn.disabled = false;

                errorBtn.innerHTML =
                    "🧬 Contribute Your DNA to the Community";

            }

            break;

    }

});
