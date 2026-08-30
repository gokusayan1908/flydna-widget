// ======================================
// FlyDNA Renderer v2.0
// Compact Community Experience
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


    // ----------------------------------
    // Community contributors
    // ----------------------------------

    if (total) {

        total.innerText =
            data.totalResponses || 0;

    }


    // ----------------------------------
    // Average intensity
    // ----------------------------------

    if (intensity) {

        intensity.innerText =
            `${data.avgIntensity || 0} / 10`;

    }


    // ----------------------------------
    // Dominant emotion
    // ----------------------------------

    if (dominant) {

        dominant.innerText =
            data.dominantEmotion || "-";

    }


    // ----------------------------------
    // Emotion breakdown
    // ----------------------------------

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


    // Highest percentage first

    emotions.sort(
        (a, b) => b[1] - a[1]
    );


    emotions.forEach(
        ([emotion, count]) => {

            const pct =
                Math.round(
                    (count / data.totalResponses) * 100
                );


            const row =
                document.createElement("div");

            row.className =
                "emotionRow";


            // --------------------------------
            // Label + percentage
            // --------------------------------

            const label =
                document.createElement("div");

            label.className =
                "emotionRowHeader";


            const name =
                document.createElement("span");

            name.innerText =
                emotion;


            const percentage =
                document.createElement("strong");

            percentage.innerText =
                `${pct}%`;


            label.appendChild(name);

            label.appendChild(percentage);


            // --------------------------------
            // Progress bar
            // --------------------------------

            const bar =
                document.createElement("div");

            bar.className =
                "emotionBar";


            const fill =
                document.createElement("div");

            fill.className =
                "emotionBarFill";

            fill.style.width =
                `${pct}%`;


            bar.appendChild(fill);


            row.appendChild(label);

            row.appendChild(bar);


            breakdown.appendChild(row);

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

        <div class="flydna-card submitted-card">


            <!-- ==================================
                 HEADER
                 ================================== -->

            <div class="logo">

                <div class="flydna-title">
                    🧬 <span>FlyDNA</span>
                </div>

            </div>


            <!-- ==================================
                 TRACK
                 ================================== -->

            <div class="track">

                <h2 id="trackTitle">
                    ${window.TRACK_TITLE || ""}
                </h2>

            </div>


            <!-- ==================================
                 PERSONAL STATUS
                 ================================== -->

            <div class="submitted-message">

                <div class="submitted-title">
                    🧬 Your DNA is already part
                    of the universe
                </div>

            </div>


            <!-- ==================================
                 COMMUNITY
                 ================================== -->

            <div class="community">

                <hr>

                <h3>
                    🌍 The Community Feeling
                </h3>


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

            </div>


        </div>

    `;


    // ----------------------------------
    // Populate aggregate
    // ----------------------------------

    if (data) {

        renderAggregate(data);

    }

}


// ======================================
// Render Immediately After Submission
// ======================================

function renderSubmittedExperience(data) {

    renderAlreadySubmitted(data);

}
