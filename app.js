const params = new URLSearchParams(window.location.search);

const entityId =
    params.get("track") || "unknown";

const entityTitle =
    params.get("title") || entityId;

const entityType =
    params.get("source") || "music";

const sessionId =
    localStorage.getItem("flydna-session") ||
    crypto.randomUUID();

localStorage.setItem(
    "flydna-session",
    sessionId
);

document.getElementById("trackTitle").innerText =
    entityTitle;

const slider =
    document.getElementById("intensity");

const value =
    document.getElementById("intensityValue");

slider.oninput = () => {

    value.innerText =
        slider.value + " / 10";

};

window.addEventListener("message",(event)=>{

    const msg = event.data;

    if(!msg) return;

    if(msg.type==="aggregate"){

        updateCommunity(msg.data);

    }

    if(msg.type==="submitSuccess"){

        document.getElementById("status").innerHTML =
            "✅ Thank you for sharing your FlyDNA.";

    }

});

function requestAggregate(){

    parent.postMessage({

        type:"getAggregate",

        entityId,
        entityTitle,
        entityType

    },"*");

}

document
.getElementById("submitButton")
.onclick=()=>{

    const emotions =
        window.getSelectedEmotions();

    if(emotions.length===0){

        alert(
            "Please choose at least one emotion."
        );

        return;

    }

    parent.postMessage({

        type:"submit",

        entityId,
        entityTitle,
        entityType,

        intensity:Number(slider.value),

        emotions,

        sessionId

    },"*");

};

function updateCommunity(data){

    document.getElementById("avgIntensity").innerText =
        data.avgIntensity ?? "-";

    document.getElementById("responses").innerText =
        data.totalResponses ?? 0;

    document.getElementById("dominant").innerText =
        data.dominantEmotion ?? "-";

    const container =
        document.getElementById("emotionBreakdown");

    container.innerHTML="";

    const breakdown =
        data.emotionBreakdown || {};

    Object.entries(breakdown)
        .sort((a,b)=>b[1]-a[1])
        .forEach(([emotion,count])=>{

            const pct =
                Math.round(
                    count /
                    data.totalResponses
                    *100
                );

            container.innerHTML +=`

<div class="bar">

<div class="barLabel">

${emotion}

(${pct}%)

</div>

<div class="progress">

<div
class="fill"
style="width:${pct}%">

</div>

</div>

</div>

`;

        });

}

requestAggregate();
