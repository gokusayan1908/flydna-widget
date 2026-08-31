// ======================================
// FlyDNA Renderer v3.3
// Personal Contribution + Universe Comparison
// Premium Result Layout
// Separate New Submission / Returning State
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


    // ==================================
    // USER FELT IT MORE
    // ==================================

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


    // ==================================
    // UNIVERSE FELT IT MORE
    // ==================================

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


    // ==================================
    // EXACT MATCH
    // ==================================

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
// RENDER PERSONAL RESULT
// ======================================
//
// This function is shared by:
//
// 1. New successful submission
// 2. Returning visitor who already submitted
//
// isNewSubmission determines the opening message.
// ======================================

function renderPersonalResult(
    data,
    isNewSubmission
) {

    const app =
        document.getElementById("app");


    if (!app) {

        return;

    }


    // ==================================
    // USER CONTRIBUTION
    // ==================================

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


    // ==================================
    // UNIVERSE DATA
    // ==================================

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


    // ==================================
    // FORMATTED DATA
    // ==================================

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
    // OPENING MESSAGE
    // ==================================

    let openingMessage;


    if (isNewSubmission) {

        openingMessage = `

            <div class="dna-thank-you">

                <span class="dna-icon">
                    🧬
                </span>

                <span>
                    Thank you very much!
                </span>

            </div>


            <div class="dna-intro">

                Your DNA is now part of the
                BeatsFlyHigh Universe.

            </div>

        `;

    }
    else {

        openingMessage = `

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

        `;

    }


    // ==================================
    // PREMIUM RESULT SCREEN
    // ==================================

    app.innerHTML = `

        <div class="submitted-state">


            <!-- ========================= -->
            <!-- OPENING MESSAGE            -->
            <!-- ========================= -->

            ${openingMessage}


            <!-- ========================= -->
            <!-- YOUR DNA                   -->
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
            <!-- DIVIDER                    -->
            <!-- ========================= -->

            <div class="dna-divider">

                <span>VS</span>

            </div>


            <!-- ========================= -->
            <!-- BFH UNIVERSE               -->
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
                            ? `
                                <span class="dna-percentage">
                                    ${dominantPct}%
                                </span>
                              `
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
            <!-- COMPARISON                 -->
            <!-- ========================= -->

            ${comparison}


            <!-- ========================= -->
            <!-- FOOTER                     -->
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
// RENDER ALREADY SUBMITTED
// ======================================
//
// Used when the visitor selects a track
// they have already contributed to.
//
// IMPORTANT:
// This is NOT used after a fresh submission.
// ======================================

function renderAlreadySubmitted(data) {

    console.log(
        "FlyDNA → rendering already submitted state:",
        data
    );


    renderPersonalResult(
        data,
        false
    );

}


// ======================================
// RENDER AFTER SUCCESSFUL SUBMISSION
// ======================================
//
// Used immediately after the visitor clicks
// "Contribute Your DNA to the Community"
// and Wix confirms the submission.
//
// This shows the THANK YOU experience.
// ======================================

function renderSubmittedExperience(data) {

    console.log(
        "FlyDNA → rendering successful submission:",
        data
    );


    renderPersonalResult(
        data,
        true
    );

}
