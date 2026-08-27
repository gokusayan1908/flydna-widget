// ======================================
// FlyDNA API Bridge
// ======================================

function requestAggregate(trackId, source = "music") {

    window.parent.postMessage({
        type: "getAggregate",
        trackId,
        source
    }, "*");

}

function submitVote(payload) {

    window.parent.postMessage({
        type: "submit",
        payload
    }, "*");

}

window.addEventListener("message", (event) => {

    if (!event.data) return;

    switch (event.data.type) {

        case "aggregate":
            renderAggregate(event.data.data);
            break;

        case "submitSuccess":
            alert("Thank you for your FlyDNA contribution!");
            break;

    }

});
