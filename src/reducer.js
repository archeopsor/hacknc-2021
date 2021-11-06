function getWords() {
    return [];
}

const initialState = {
    words: [
        {text: "HackNC 2021", value: 10},
        {text: "Simi Singh", value: 5},
        {text: "Win Geigerman", value: 5},
    ],
    data: {
        total: 20,
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
          state.words = getWords(action.payload);
        return state;
      }
      case "resetAudio": {
          state.audio = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
              }
            }
        return state;
      }
      default:
        return state;
    }
  }