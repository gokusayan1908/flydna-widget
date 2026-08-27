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

};

// --------------------------------------
// Request Community DNA
// --------------------------------------

window.requestAggregate = function(trackId, type) {

    window.parent.postMessage({

        type: "getAggregate",

        trackId,

        type

    }, "*");

};

// --------------------------------------
// Submit Vote
// --------------------------------------

window.submitVote = function(vote) {

    window.parent.postMessage({

        type: "submit",

        payload: vote

    }, "*");

};

// --------------------------------------
// Receive messages from Wix
// --------------------------------------

window.addEventListener("message", (event) => {

    if (!event.data) return;

    console.log("FlyDNA ← Wix", event.data);

    switch (event.data.type) {

        case "aggregate":

            renderAggregate(event.data.data);
            break;

        case "submitSuccess":

            document.getElementById("submitBtn").innerHTML =
                "✅ Thank you!";

            window.requestAggregate(
                voteTrackId,
                voteType
            );

            break;

    }

});
