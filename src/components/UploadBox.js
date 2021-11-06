import {useState} from 'react';
import {Recorder} from 'react-voice-recorder';
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

    // If a file exists, only show a button to clear the file
    // Otherwise, show all the input methods
    if (show) {
        return (
            <div>
                <h1 class="center">Choose a method to generate words:</h1>
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
                        mimeTypeToUseWhenRecording={`audio/webm`}
                    />
                </div>
                <input type="text" placeholder="Enter text here" />
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