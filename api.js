// ======================================
// FlyDNA API Bridge
// ======================================

let voteTrackId = "";
let voteType = "";

// --------------------------------------
// Initialise
// --------------------------------------

function initialiseVoting(trackId, type) {

    voteTrackId = trackId;
    voteType = type;

}

// --------------------------------------
// Request Community DNA
// --------------------------------------

function requestAggregate(trackId, type) {

    window.parent.postMessage({

        type: "getAggregate",

        trackId: trackId,

        type: type

    }, "*");

}

// --------------------------------------
// Submit Vote
// --------------------------------------

function submitVote(vote) {

    window.parent.postMessage({

        type: "submit",

        payload: vote

    }, "*");

}

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

            requestAggregate(
                voteTrackId,
                voteType
            );

            break;

    }

});
