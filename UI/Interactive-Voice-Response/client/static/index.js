// Set up a new Speech Recognizer
const recognition = new webkitSpeechRecognition();
// Set the new language setting.
// More info here: https://stackoverflow.com/questions/14257598/what-are-language-codes-in-chromes-implementation-of-the-html5-speech-recogniti
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

// Start recognizing after the button is clicked.
document.getElementById("record").onclick = function() {
    document.getElementById("record").style.backgroundColor = "#FF5733";
    recognition.start();
}
recognition.onspeechend = () => {
    document.getElementById("record").style.backgroundColor = "#5a17ee";
}

// Once a result is parsed, send the parsed text to a Rasa server and update HTML
recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var lang = recognition.lang;
    // console.log(transcript)
    // console.log('Confidence: ' + event.results[0][0].confidence);
    var textnode = document.createElement("h2");
    textnode.innerHTML = `<code>You: ${transcript}</code>`;
    document.getElementById("output").appendChild(textnode);
    
    // Translating languages here
    // console.log(transcript);
    // console.log(document.getElementById("language").value);
    if(lang!='en-US'){
        let translationPayload = {
            method: "POST",
            body:   JSON.stringify({
                text: transcript
            })
        };
        fetch('/translate-to-english/', translationPayload)
        .then(result =>{
            result.json()
            .then(response => {
                transcript= response.translated_text;
            })
        }) 
        .catch(error => {
            console.log(error);
        })
    }
    
    let payload = {
        method: "POST",
        body: JSON.stringify({text: transcript})        
    }
    fetch("/api/", payload)
    .then(result => {
        result.json()
        .then(response => {
            console.log(response[0].text);
            let textnode = document.createElement("h2");
            var final_response = response[0].text;

            if(recognition.lang!='en-US'){
                queryBody =     JSON.stringify({
                    lang: lang,
                    text: response[0].text,
                }); 
                console.log(queryBody);
                let translationPayload = {
                    method: "POST",
                    body:  queryBody,
                    headers: {'content-type': 'application/json'}
                };
                fetch('/translate-from-english/', translationPayload)
                .then(result =>{
                    result.json()
                    .then(res => {
                        final_response = res.translated_text;
                        textnode.innerHTML = `<code>Bot: ${final_response}</code>`;
                        document.getElementById("output").appendChild(textnode);
                        var utterance = new SpeechSynthesisUtterance(final_response);
                        utterance.lang = lang;
                        speechSynthesis.speak(utterance);
                    })
                }) 
                .catch(error => {
                    console.log(error);
                })
            }
            else {
                textnode.innerHTML = `<code>Bot: ${final_response}</code>`;
                document.getElementById("output").appendChild(textnode);
                speechSynthesis.speak(new SpeechSynthesisUtterance(response[0].text));
            }
        })
    })
    .catch(error => console.log(error));
}


// changeLang(): Fuction triggered when user changes default language
function changeLang(sel)    {
    console.log(sel.value);
    recognition.lang = sel.value;
}

function sendTypedMessage(data) {
    console.log(data);
    let textbox = document.getElementById("textbox-text");
    var transcript = textbox.value;
    var lang = recognition.lang;
    // console.log(transcript)
    // console.log('Confidence: ' + event.results[0][0].confidence);
    var textnode = document.createElement("h2");
    textnode.innerHTML = `<code>You: ${transcript}</code>`;
    document.getElementById("output").appendChild(textnode);
    
    // Translating languages here
    // console.log(transcript);
    // console.log(document.getElementById("language").value);
    if(lang!='en-US'){
        let translationPayload = {
            method: "POST",
            body:   JSON.stringify({
                text: transcript
            })
        };
        fetch('/translate-to-english/', translationPayload)
        .then(result =>{
            result.json()
            .then(response => {
                transcript= response.translated_text;
            })
        }) 
        .catch(error => {
            console.log(error);
        })
    }
    
    let payload = {
        method: "POST",
        body: JSON.stringify({text: transcript})        
    }
    fetch("/api/", payload)
    .then(result => {
        result.json()
        .then(response => {
            console.log(response[0].text);
            let textnode = document.createElement("h2");
            var final_response = response[0].text;

            if(recognition.lang!='en-US'){
                queryBody =     JSON.stringify({
                    lang: lang,
                    text: response[0].text,
                }); 
                console.log(queryBody);
                let translationPayload = {
                    method: "POST",
                    body:  queryBody,
                    headers: {'content-type': 'application/json'}
                };
                fetch('/translate-from-english/', translationPayload)
                .then(result =>{
                    result.json()
                    .then(res => {
                        final_response = res.translated_text;
                        textnode.innerHTML = `<code>Bot: ${final_response}</code>`;
                        document.getElementById("output").appendChild(textnode);
                        var utterance = new SpeechSynthesisUtterance(final_response);
                        utterance.lang = lang;
                        speechSynthesis.speak(utterance);
                    })
                }) 
                .catch(error => {
                    console.log(error);
                })
            }
            else {
                textnode.innerHTML = `<code>Bot: ${final_response}</code>`;
                document.getElementById("output").appendChild(textnode);
                speechSynthesis.speak(new SpeechSynthesisUtterance(response[0].text));
            }
        })
    })
    .catch(error => console.log(error));
    textbox.value = ""

}