import ReactWordcloud from 'react-wordcloud';
import './Cloud.css'

const Cloud = (store) => {
    var store_data = store.store.store.getState()

    const determineColor = (value) => {
        const freq = value / store_data.data.total;
        const colors = new Map([
            ['']
        ])

        
        return "blue";
    }
    
    const callbacks = {
        getWordColor: word => determineColor(word.value),
        getWordTooltip: word => `${word.text} (${word.value})`,
    }

    const options = {
        rotations: 1,
        rotationAngles: [0],
        enableTooltip: false,
        // rotations: 2,
        // rotationAngles: [-90, 0],
        // fontSizes: [12, 20]
      };

    return (
        <ReactWordcloud
            callbacks = {callbacks}
            options = {options}
            words = {store.store.words}
            minSize={20}
        />
    )
}

export default Cloud;