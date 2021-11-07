import {useState} from 'react';
import {Recorder} from 'react-voice-recorder';
import $ from 'jquery';
import 'react-voice-recorder/dist/index.css';
import './UploadBox.css';

const UploadBox = (store) => {
    var store_data = store.store.store.getState()
    const [show, setShow] = useState(true);

    const handleAudioStop = (data) => {
        store.store.dispatch({
            type: "deliverAudio",
            payload: data
        })
    }

    const handleAudioUpload = (file) => {
        if (file === null) {
            window.alert("No file available. Make sure you've stopped recording before uploading.")
            return;
        }
        setShow(false);
        if (store_data.audio.url) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    // TODO Handle upload
                    // Maybe make api request here?
                }
            }
        }
    }

    const handleReset = () => {
        setShow(true);
        store.store.dispatch({
            type: "resetAudio",
            payload: null
        })
    }

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                // TODO Handle upload here too
            }
        }
    }

    const run = () => {
        window.alert(document.getElementById("textinput").value);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/process",
            data: { text: document.getElementById("textinput").value },
            async: true,
            timeout: 60000,
            success: function(msg) {
                console.log(msg)
                store.store.dispatch({
                    type: "newWords",
                    payload: msg})
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // If a file exists, only show a button to clear the file
    // Otherwise, show all the input methods
    if (show) {
        return (
            <div>
                <h1 class="center"><u>Choose a method to generate words:</u></h1>
                <textarea class="text-input-box" id="textinput">Enter text here</textarea>
                <div class="fileupload">
                    <input type="file" accept="audio/*" />
                </div>
                <div class="recorder-container">
                    <Recorder 
                        record={true}
                        title={"New recording"}
                        showUIAudio
                        audioURL={store_data.audio.url}
                        handleAudioStop={data => handleAudioStop(data)}
                        handleAudioUpload={file => handleAudioUpload(file)}
                        handleReset={() => handleReset()}
                    />
                </div>
                {/* <input type="text" id="textinput" placeholder="Enter text here" /> */}
                <div>
                    <button class="runbutton" onClick={run}>Create word cloud</button>
                </div>
            </div>
        )
    }
    return (
        <div class="center">
            <button onClick={handleReset}>Clear file</button>
        </div>
    )
}

export default UploadBox;