// ======================================
// FlyDNA Renderer v3.0
// Compact Widget
// ======================================


// ======================================
// GLOBAL CONTRIBUTION KEY
// ======================================

const FLYDNA_CONTRIBUTED_KEY =
    "flydna_has_contributed";


// ======================================
// Render Community Aggregate
// ======================================

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
// contributed DNA to the BFH Universe.
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

        🧬 Your DNA is already part of the BFH Universe.

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

    // ----------------------------------
    // Remember that this visitor has
    // contributed to the BFH Universe.
    // ----------------------------------

    localStorage.setItem(
        FLYDNA_CONTRIBUTED_KEY,
        "true"
    );


    console.log(
        "FlyDNA → visitor added to BFH Universe"
    );


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
