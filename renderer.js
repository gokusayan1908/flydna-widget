// ======================================
// FlyDNA Renderer v3.0
// Compact Widget
// ======================================


// ======================================
// Render Community Aggregate
// ======================================
//
// Community data is received from Wix,
// but it is intentionally NOT displayed
// inside the compact FlyDNA voting widget.
//
// The community experience will be handled
// elsewhere in the BeatsFlyHigh interface.
//

function renderAggregate(data) {

    if (!data) {
        return;
    }

    console.log(
        "FlyDNA community aggregate received:",
        data
    );

}


// ======================================
// Render Already Submitted
// ======================================

function renderAlreadySubmitted(data) {

    const app =
        document.getElementById("app");


    if (!app) {
        return;
    }


    app.innerHTML = `

<div class="submitted-state">

    <div class="submitted-message">

        🧬 Your DNA is already part of the universe

    </div>

</div>

`;


}


// ======================================
// Render Immediately After Submission
// ======================================

function renderSubmittedExperience(data) {

    renderAlreadySubmitted(data);

}
