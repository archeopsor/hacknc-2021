import ReactWordcloud from 'react-wordcloud';
import './Cloud.css'

const Cloud = (store) => {
    var store_data = store.store.store.getState()
    
    const callbacks = {
        getWordColor: word => word.value > (store_data.data.total / 3) ? "blue" : "red",
        getWordTooltip: word => `${word.text} (${word.value})`,
    }

    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
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