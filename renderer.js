// ======================================
// FlyDNA Renderer v3.1
// Personal Contribution + Universe Comparison
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
        .join(" · ");

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
            <div class="dna-comparison positive">
                ⬆️ You felt it
                <strong>${difference}</strong>
                point${difference === 1 ? "" : "s"}
                more intensely than the Universe.
            </div>
        `;

    }


    if (difference < 0) {

        const absoluteDifference =
            Math.abs(difference);


        return `
            <div class="dna-comparison negative">
                ⬇️ The Universe felt it
                <strong>${absoluteDifference}</strong>
                point${absoluteDifference === 1 ? "" : "s"}
                more intensely than you.
            </div>
        `;

    }


    return `
        <div class="dna-comparison equal">
            🧬 Your emotional intensity matches the Universe.
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
//
// This is shown when the visitor has already
// contributed DNA to the current track.
//
// IMPORTANT:
// The widget remains in "already submitted"
// mode, but now rewards the visitor by showing
// their personal contribution versus the
// current community / Universe contribution.
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


    app.innerHTML = `

        <div class="submitted-state">

            <div class="submitted-message">

                <div class="dna-thank-you">

                    🧬 Your DNA is already part
                    of the BFH Universe

                </div>


                <div class="dna-subtitle">

                    Your contribution to this track

                </div>


                <div class="dna-personal">

                    <div class="dna-section-title">

                        🧬 YOUR EMOTIONAL DNA

                    </div>


                    <div class="dna-score">

                        🔥
                        <strong>
                            ${formatScore(userIntensity)}
                        </strong>

                    </div>


                    <div class="dna-emotions">

                        ${userEmotionText}

                    </div>

                </div>


                <div class="dna-divider"></div>


                <div class="dna-universe">

                    <div class="dna-section-title">

                        🌍 THE BFH UNIVERSE

                    </div>


                    <div class="dna-score">

                        🌍
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
                                ? ` · ${dominantPct}%`
                                : ""
                        }

                    </div>


                    <div class="dna-responses">

                        Based on
                        ${totalResponses}
                        ${
                            totalResponses === 1
                                ? "contribution"
                                : "contributions"
                        }

                    </div>

                </div>


                ${comparison}


                <div class="dna-footer">

                    Your reaction is now part of
                    the collective DNA of BeatsFlyHigh.

                </div>

            </div>

        </div>

    `;

}


// ======================================
// RENDER AFTER SUCCESSFUL SUBMISSION
// ======================================
//
// The backend returns the newly calculated
// aggregate after inserting the visitor's vote.
//
// We deliberately use the same renderer so
// the visitor immediately receives the same
// rewarding experience without needing to
// reload the track.
// ======================================

function renderSubmittedExperience(data) {

    console.log(
        "FlyDNA → rendering personal DNA experience:",
        data
    );


    renderAlreadySubmitted(data);

}
