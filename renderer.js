// ======================================
// FlyDNA Renderer v3.2
// Personal Contribution + Universe Comparison
// Premium Result Layout
// ======================================


// ======================================
// EMOTION DISPLAY
// ======================================

const emotionDisplay = {

    Love: "❤️",
    Energy: "⚡",
    Joy: "😊",
    Sadness: "😢",
    Nostalgia: "🌃",
    Passion: "🔥",
    Peace: "🕊️",
    Hope: "✨",
    Celebration: "🎉",
    Cinematic: "🎬"

};


// ======================================
// FORMAT EMOTION
// ======================================

function formatEmotion(emotion) {

    const emoji =
        emotionDisplay[emotion] || "🧬";

    return `${emoji} ${emotion}`;

}


// ======================================
// FORMAT EMOTION LIST
// ======================================

function formatEmotionList(emotions) {

    if (
        !Array.isArray(emotions) ||
        emotions.length === 0
    ) {

        return "No emotions recorded";

    }


    return emotions
        .map(formatEmotion)
        .join("  ·  ");

}


// ======================================
// FORMAT SCORE
// ======================================

function formatScore(value) {

    const number =
        Number(value);

    if (Number.isNaN(number)) {
        return "0 / 10";
    }

    return `${number} / 10`;

}


// ======================================
// INTENSITY COMPARISON
// ======================================

function getIntensityComparison(
    userIntensity,
    universeIntensity
) {

    const user =
        Number(userIntensity);

    const universe =
        Number(universeIntensity);


    if (
        Number.isNaN(user) ||
        Number.isNaN(universe)
    ) {

        return "";

    }


    const difference =
        Math.round(
            (user - universe) * 10
        ) / 10;


    if (difference > 0) {

        return `

            <div class="dna-comparison dna-comparison-positive">

                <div class="dna-comparison-icon">
                    ⬆️
                </div>

                <div>
                    You felt it
                    <strong>
                        ${difference}
                    </strong>
                    point${difference === 1 ? "" : "s"}
                    more intensely than the Universe.
                </div>

            </div>

        `;

    }


    if (difference < 0) {

        const absoluteDifference =
            Math.abs(difference);


        return `

            <div class="dna-comparison dna-comparison-negative">

                <div class="dna-comparison-icon">
                    ⬇️
                </div>

                <div>
                    The Universe felt it
                    <strong>
                        ${absoluteDifference}
                    </strong>
                    point${absoluteDifference === 1 ? "" : "s"}
                    more intensely than you.
                </div>

            </div>

        `;

    }


    return `

        <div class="dna-comparison dna-comparison-equal">

            <div class="dna-comparison-icon">
                🧬
            </div>

            <div>
                Your emotional intensity
                <strong>matches the Universe.</strong>
            </div>

        </div>

    `;

}


// ======================================
// RENDER COMMUNITY AGGREGATE
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
// RENDER ALREADY SUBMITTED
// ======================================

function renderAlreadySubmitted(data) {

    const app =
        document.getElementById("app");


    if (!app) {
        return;
    }


    const userContribution =
        data?.userContribution || {};


    const userIntensity =
        Number(
            userContribution.intensity || 0
        );


    const userEmotions =
        Array.isArray(
            userContribution.emotions
        )
            ? userContribution.emotions
            : [];


    const universeIntensity =
        Number(
            data?.avgIntensity || 0
        );


    const dominantEmotion =
        data?.dominantEmotion || null;


    const dominantPct =
        Number(
            data?.dominantPct || 0
        );


    const totalResponses =
        Number(
            data?.totalResponses || 0
        );


    const universeEmotion =
        dominantEmotion
            ? formatEmotion(dominantEmotion)
            : "No dominant emotion yet";


    const userEmotionText =
        formatEmotionList(
            userEmotions
        );


    const comparison =
        getIntensityComparison(
            userIntensity,
            universeIntensity
        );


    // ==================================
    // PREMIUM RESULT SCREEN
    // ==================================

    app.innerHTML = `

        <div class="submitted-state">

            <!-- ========================= -->
            <!-- THANK YOU                 -->
            <!-- ========================= -->

            <div class="dna-thank-you">

                <span class="dna-icon">
                    🧬
                </span>

                <span>
                    Your DNA is already part
                    of the BFH Universe
                </span>

            </div>


            <div class="dna-intro">

                Your contribution to this track

            </div>


            <!-- ========================= -->
            <!-- YOUR DNA                  -->
            <!-- ========================= -->

            <div class="dna-card dna-personal">

                <div class="dna-section-title">

                    🧬 YOUR EMOTIONAL DNA

                </div>


                <div class="dna-score">

                    <span class="dna-score-emoji">
                        🔥
                    </span>

                    <strong>
                        ${formatScore(userIntensity)}
                    </strong>

                </div>


                <div class="dna-emotions">

                    ${userEmotionText}

                </div>

            </div>


            <!-- ========================= -->
            <!-- DIVIDER                   -->
            <!-- ========================= -->

            <div class="dna-divider">

                <span>VS</span>

            </div>


            <!-- ========================= -->
            <!-- UNIVERSE                  -->
            <!-- ========================= -->

            <div class="dna-card dna-universe">

                <div class="dna-section-title">

                    🌍 THE BFH UNIVERSE

                </div>


                <div class="dna-score">

                    <span class="dna-score-emoji">
                        🌍
                    </span>

                    <strong>
                        ${formatScore(universeIntensity)}
                    </strong>

                </div>


                <div class="dna-emotions">

                    Most felt:

                    <strong>
                        ${universeEmotion}
                    </strong>

                    ${
                        dominantEmotion
                            ? `<span class="dna-percentage">
                                ${dominantPct}%
                               </span>`
                            : ""
                    }

                </div>


                <div class="dna-responses">

                    Based on
                    <strong>
                        ${totalResponses}
                    </strong>
                    ${
                        totalResponses === 1
                            ? "contribution"
                            : "contributions"
                    }

                </div>

            </div>


            <!-- ========================= -->
            <!-- COMPARISON                -->
            <!-- ========================= -->

            ${comparison}


            <!-- ========================= -->
            <!-- FOOTER                   -->
            <!-- ========================= -->

            <div class="dna-footer">

                <div class="dna-footer-icon">
                    🧬
                </div>

                <div>
                    Your reaction is now part of the
                    collective DNA of BeatsFlyHigh.
                </div>

            </div>

        </div>

    `;

}


// ======================================
// RENDER AFTER SUCCESSFUL SUBMISSION
// ======================================

function renderSubmittedExperience(data) {

    console.log(
        "FlyDNA → rendering personal DNA experience:",
        data
    );


    renderAlreadySubmitted(data);

}
