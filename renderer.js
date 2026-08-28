// ======================================
// FlyDNA Renderer
// ======================================


// ======================================
// Render Community Aggregate
// ======================================

function renderAggregate(data) {

    if (!data) return;

    const total =
        document.getElementById("fd-total");

    const intensity =
        document.getElementById("fd-intensity");

    const dominant =
        document.getElementById("fd-dominant");

    const breakdown =
        document.getElementById("fd-breakdown");


    if (total) {

        total.innerText =
            data.totalResponses || 0;

    }


    if (intensity) {

        intensity.innerText =
            (data.avgIntensity || 0) + " / 10";

    }


    if (dominant) {

        dominant.innerText =
            data.dominantEmotion || "-";

    }


    if (!breakdown) return;

    breakdown.innerHTML = "";


    if (
        !data.emotionBreakdown ||
        !data.totalResponses
    ) {

        return;

    }


    const emotions =
        Object.entries(
            data.emotionBreakdown
        );


    emotions.sort(
        (a, b) => b[1] - a[1]
    );


    emotions.forEach(
        ([emotion, count]) => {

            const pct =
                Math.round(
                    (count / data.totalResponses) * 100
                );


            breakdown.innerHTML += `

<div class="emotionRow">

    <div
        style="
        display:flex;
        justify-content:space-between;
        margin-bottom:4px;">

        <span>${emotion}</span>

        <strong>${pct}%</strong>

    </div>

    <div
        style="
        width:100%;
        height:10px;
        background:#2b2b38;
        border-radius:10px;
        overflow:hidden;">

        <div
            style="
            width:${pct}%;
            height:100%;
            background:linear-gradient(
                90deg,
                #3b82f6,
                #06b6d4
            );">

        </div>

    </div>

</div>

`;

        }
    );

}


// ======================================
// Render Already Submitted Experience
// ======================================

function renderAlreadySubmitted(data) {

    const app =
        document.getElementById("app");

    if (!app) return;


    // Keep the community statistics
    // available below the message.

    app.innerHTML = `

<div class="logo">

    🧬

    <h1>FlyDNA</h1>

    <p>
        What impact did this experience have on you?
    </p>

</div>

<div class="track">

    <h2 id="trackTitle">
        ${window.TRACK_TITLE || ""}
    </h2>

</div>


<div
    style="
    text-align:center;
    padding:35px 10px 25px;">

    <div
        style="
        font-size:28px;
        margin-bottom:10px;">

        🧬

    </div>

    <div
        style="
        font-size:24px;
        font-weight:bold;">

        Your DNA is already part of the universe

    </div>

</div>


<hr>


<div
    style="
    text-align:center;
    margin:20px 0;">

    <div
        style="
        font-size:24px;
        font-weight:bold;">

        🌍 The Community Feeling

    </div>

</div>


<div class="stats">

    <div class="stat">

        <span>
            Community Contributors
        </span>

        <strong id="fd-total">
            0
        </strong>

    </div>

    <div class="stat">

        <span>
            Average Emotional Impact
        </span>

        <strong id="fd-intensity">
            0 / 10
        </strong>

    </div>

    <div class="stat">

        <span>
            Community Emotional DNA
        </span>

        <strong id="fd-dominant">
            -
        </strong>

    </div>

    <div id="fd-breakdown">
    </div>

</div>

`;


    if (data) {

        renderAggregate(data);

    }

}


// ======================================
// Render Immediately After Submission
// ======================================

function renderSubmittedExperience(data) {

    const app =
        document.getElementById("app");

    if (!app) return;


    app.innerHTML = `

<div class="logo">

    🧬

    <h1>FlyDNA</h1>

    <p>
        What impact did this experience have on you?
    </p>

</div>

<div class="track">

    <h2 id="trackTitle">
        ${window.TRACK_TITLE || ""}
    </h2>

</div>


<div
    style="
    text-align:center;
    padding:30px 10px 20px;">

    <div
        style="
        font-size:28px;
        margin-bottom:10px;">

        🧬

    </div>

    <div
        style="
        font-size:24px;
        font-weight:bold;">

        Your DNA is now part of the universe

    </div>

</div>


<hr>


<div
    style="
    text-align:center;
    margin:20px 0;">

    <div
        style="
        font-size:24px;
        font-weight:bold;">

        🌍 The Community Feeling

    </div>

</div>


<div class="stats">

    <div class="stat">

        <span>
            Community Contributors
        </span>

        <strong id="fd-total">
            0
        </strong>

    </div>

    <div class="stat">

        <span>
            Average Emotional Impact
        </span>

        <strong id="fd-intensity">
            0 / 10
        </strong>

    </div>

    <div class="stat">

        <span>
            Community Emotional DNA
        </span>

        <strong id="fd-dominant">
            -
        </strong>

    </div>

    <div id="fd-breakdown">
    </div>

</div>

`;


    if (data) {

        renderAggregate(data);

    }

}
