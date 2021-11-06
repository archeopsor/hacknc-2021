function getWords() {
    return []; // TODO
}

function countWords() {
    return 0; // TODO
}

const initialState = {
    words: [
        {text: "HackNC 2021", value: 1},
        {text: "Simi Singh", value: 2},
        {text: "Win Geigerman", value: 3},
        {text: "HackNC 2021", value: 4},
        {text: "Simi Singh", value: 5},
        {text: "Win Geigerman", value: 6},
        {text: "HackNC 2021", value: 7},
        {text: "Simi Singh", value: 8},
        {text: "Win Geigerman", value: 9},
        {text: "HackNC 2021", value: 10},
        {text: "Simi Singh", value: 11},
        {text: "Win Geigerman", value: 12},
        {text: "HackNC 2021", value: 13},
        {text: "Simi Singh", value: 14},
        {text: "Win Geigerman", value: 15},
        {text: "HackNC 2021", value: 16},
        {text: "Simi Singh", value: 17},
        {text: "Win Geigerman", value: 18},
        {text: "HackNC 2021", value: 19},
        {text: "Simi Singh", value: 20},
        {text: "Win Geigerman", value: 21},
        {text: "HackNC 2021", value: 22},
        {text: "Simi Singh", value: 23},
        {text: "Win Geigerman", value: 24},
    ],
    data: {
        total: 300,
    },
    audio: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
          }
    }
  };
  
  export default function wordcloudReducer(state = initialState, action) {
    switch (action.type) {
      case "newWords": {
          return {
              words: getWords(action.payload),
              data: countWords(action.payload),
              audio: state.audio,
          }
      }
      case "resetAudio": {
          return {
            words: state.words,
            data: state.data,
            audio: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                    h: 0,
                    m: 0,
                    s: 0
                }
            }
        }   
      }
      case "deliverAudio": {
          return {
              words: state.words,
              data: state.data,
              audio: {
                  url: action.payload.url,
                  blob: action.payload.blob,
                  chunks: action.payload.chunks,
                  duration: action.payload.duration,
              }
          }
      }
      default:
        return state;
    }
  }