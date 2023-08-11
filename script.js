console.log("Working");

const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button")
    ;

let synth = window.speechSynthesis;
let isSpeeking = true;

setTimeout(voices(), 10);

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    };

}

synth.addEventListener('voiceschanged', voices);

function textToSpeech(text) {
    console.log("calling");
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", (e) => {

    e.preventDefault();

    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            setInterval(() => {
                if (!synth.speaking && !isSpeeking) {
                    isSpeeking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            }, 500);

            if (isSpeeking) {
                synth.resume();
                isSpeeking = false;
                speechBtn.innerText = "Pause Speech";
            }
            else {
                synth.pause();
                isSpeeking = true;
                speechBtn.innerText = "Resume Speech"
            }

        } else {
            speechBtn.innerText = "Convert To Speech";
        }

    }

});