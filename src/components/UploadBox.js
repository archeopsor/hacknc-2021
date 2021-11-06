import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

const UploadBox = (store) => {
    var store_data = store.store.store.getState()

    return (
        <Recorder 
            record={true}

        />
    )
}