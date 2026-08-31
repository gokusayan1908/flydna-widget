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
//
// Used when this visitor has already
// submitted DNA for this track.
//

function renderAlreadySubmitted(data) {

    const app =
        document.getElementById("app");


    if (!app) {
        return;
    }


    app.innerHTML = `

<div class="submitted-state">

    <div class="submitted-message">

        🧬 Your DNA is already part of the Universe

    </div>

</div>

`;

}


// ======================================
// Render Immediately After Submission
// ======================================
//
// Used only after a NEW successful
// submission.
//

function renderSubmittedExperience(data) {

    const app =
        document.getElementById("app");


    if (!app) {
        return;
    }


    app.innerHTML = `

<div class="submitted-state">

    <div class="submitted-message">

        🧬 Thank you very much!<br>
        Your DNA is now part of the BeatsFlyHigh Universe.

    </div>

</div>

`;

}
