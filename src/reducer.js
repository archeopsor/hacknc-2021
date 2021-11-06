function getWords() {
    return ;
}

const initialState = {
    words: {
        main: "HackNC 2021",
        other: [
            ["Simi Singh", 0.5],
            ["Win Geigerman", 0.5],
        ]
    }
  };
  
  export default function wordcloudReducer(state = initialState, action) {
    switch (action.type) {
      case "newWords": {
        return {
            data: getWords(action.payload)
          };
      }
      default:
        return state;
    }
  }