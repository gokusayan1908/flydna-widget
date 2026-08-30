// ======================================
// FlyDNA Renderer
// ======================================


// ======================================
// Render Community Aggregate
// ======================================

function renderAggregate(data) {

    if (!data) {
        return;
    }

    const total =
        document.getElementById("fd-total");

    const intensity =
        document.getElementById("fd-intensity");

    const dominant =
        document.getElementById("fd-dominant");

    const breakdown =
        document.getElementById("fd-breakdown");

    const communitySection =
        document.getElementById("communitySection");


    // ======================================
    // COMMUNITY SECTION
    // ======================================

    // Community DNA is only shown after
    // the visitor has submitted.
    if (communitySection) {

        communitySection.style.display = "none";

    }


    // ======================================
    // TOTAL RESPONSES
    // ======================================

    if (total) {

        total.innerText =
            data.totalResponses || 0;

    }


    // ======================================
    // AVERAGE INTENSITY
    // ======================================

    if (intensity) {

        intensity.innerText =
            (data.avgIntensity || 0) + " / 10";

    }


    // ======================================
    // DOMINANT EMOTION
    // ======================================

    if (dominant) {

        dominant.innerText =
            data.dominantEmotion || "-";

    }


    // ======================================
    // EMOTION BREAKDOWN
    // ======================================

    if (!breakdown) {

        return;

    }


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
        margin-bottom:3px;
        font-size:12px;">

        <span>
            ${emotion}
        </span>

        <strong>
            ${pct}%
        </strong>

    </div>


    <div
        style="
        width:100%;
        height:7px;
        background:#2b2b38;
        border-radius:7px;
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
// Render Already Submitted
// ======================================

function renderAlreadySubmitted(data) {

    const app =
        document.getElementById("app");


    if (!app) {

        return;

    }


    app.innerHTML = `

<div style="
    width:100%;
    box-sizing:border-box;
">


    <!-- ==================================
         TRACK
         ================================== -->

    <div style="
        font-size:13px;
        color:#8eb8ff;
        margin-bottom:8px;
    ">

        ${window.TRACK_TITLE || ""}

    </div>


    <!-- ==================================
         ALREADY CONTRIBUTED
         ================================== -->

    <div style="
        text-align:center;
        padding:12px 4px 10px;
    ">

        <div style="
            font-size:19px;
            font-weight:600;
            line-height:1.2;
        ">

            🧬 Your DNA is already part of the universe

        </div>

    </div>


    <!-- ==================================
         COMMUNITY
         ================================== -->

    <div
        id="communitySection"
        style="
            border-top:1px solid #30303b;
            padding-top:9px;
        ">


        <div style="
            text-align:center;
            font-size:19px;
            font-weight:600;
            margin-bottom:8px;
        ">

            🌍 The Community Feeling

        </div>


        <div class="stats">


            <!-- ==============================
                 CONTRIBUTORS
                 ============================== -->

            <div class="stat">

                <span>
                    Community Contributors
                </span>

                <strong id="fd-total">
                    0
                </strong>

            </div>


            <!-- ==============================
                 AVERAGE INTENSITY
                 ============================== -->

            <div class="stat">

                <span>
                    Average Emotional Impact
                </span>

                <strong id="fd-intensity">
                    0 / 10
                </strong>

            </div>


            <!-- ==============================
                 DOMINANT EMOTION
                 ============================== -->

            <div class="stat">

                <span>
                    Community Emotional DNA
                </span>

                <strong id="fd-dominant">
                    -
                </strong>

            </div>


            <!-- ==============================
                 EMOTION BREAKDOWN
                 ============================== -->

            <div id="fd-breakdown">
            </div>


        </div>

    </div>

</div>

`;


    // ======================================
    // RENDER COMMUNITY DATA
    // ======================================

    if (data) {

        const communitySection =
            document.getElementById(
                "communitySection"
            );


        if (communitySection) {

            communitySection.style.display =
                "block";

        }


        renderAggregate(data);

    }

}


// ======================================
// Render Immediately After Submission
// ======================================

function renderSubmittedExperience(data) {

    renderAlreadySubmitted(data);

}
