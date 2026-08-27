// ======================================
// FlyDNA API Bridge
// ======================================

function requestAggregate(trackId, source) {

    window.parent.postMessage({

        type: "getAggregate",

        trackId,

        source

    }, "*");

}

function submitVote(vote) {

    window.parent.postMessage({

        type: "submit",

        payload: vote

    }, "*");

}

window.addEventListener("message", (event) => {

    if (!event.data)
        return;

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
                voteSource
            );

            break;

    }

});

let voteTrackId = "";
let voteSource = "";

function initialiseVoting(trackId, source) {

    voteTrackId = trackId;

    voteSource = source;

}
