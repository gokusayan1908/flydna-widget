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
        trackId,
        entityType: type
    });

};

// --------------------------------------
// Request Community DNA
// --------------------------------------

window.requestAggregate = function(trackId, entityType) {

    console.log("FlyDNA → requesting aggregate:", {
        trackId,
        entityType
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

    console.log("FlyDNA → sending submit to Wix", vote);

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

    console.log("FlyDNA ← Wix", event.data);

    switch (event.data.type) {

        // ----------------------------------
        // Community aggregate received
        // ----------------------------------

        case "aggregate":

            console.log(
                "FlyDNA aggregate received:",
                event.data.data
            );

            renderAggregate(event.data.data);

            break;


        // ----------------------------------
        // Successful submission
        // ----------------------------------

        case "submitSuccess":

            console.log(
                "FlyDNA submission successful:",
                event.data.data
            );

            // The submit button is no longer needed
            const submitBtn =
                document.getElementById("submitBtn");

            if (submitBtn) {

                submitBtn.innerHTML =
                    "✅ Your DNA is now part of the universe";

                submitBtn.disabled = true;

            }

            // Show the community result
            if (event.data.data) {

                renderAggregate(event.data.data);

            }

            break;


        // ----------------------------------
        // Already submitted
        // ----------------------------------

        case "alreadySubmitted":

            console.log(
                "FlyDNA visitor already submitted"
            );

            if (typeof renderAlreadySubmitted === "function") {

                renderAlreadySubmitted();

            }

            break;


        // ----------------------------------
        // Submission error
        // ----------------------------------

        case "submitError":

            console.error(
                "FlyDNA submission failed"
            );

            const errorBtn =
                document.getElementById("submitBtn");

            if (errorBtn) {

                errorBtn.disabled = false;

                errorBtn.innerHTML =
                    "🧬 Contribute Your DNA to the Community";

            }

            break;

    }

});
