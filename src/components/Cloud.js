import ReactWordcloud from 'react-wordcloud';
import './Cloud.css'

const Cloud = (store) => {
    var store_data = store.store.store.getState()

    const determineColor = (value) => {
        const freq = value / store_data.data.total;
        const colors = new Map([
            [0.2, 'blue'],
            [0.3, 'navy'],
            [0.4, 'indigo'],
            [0.5, 'blueviolet'],
            [0.6, 'purple'],
            [0.7, 'magenta'],
            [0.8, 'crimson'],
        ])

        for (const key of colors.keys()) {
            if (freq < key) {
                return colors.get(key);
            }
        }
        
        return "black";
    }
    
    const callbacks = {
        getWordColor: word => determineColor(word.value),
        // getWordTooltip: word => `${word.text} (${word.value})`,
    }

    const options = {
        rotations: 1,
        rotationAngles: [0],
        enableTooltip: false,
        fontFamily: "Comfortaa",
        // rotations: 2,
        // rotationAngles: [-90, 0],
        fontSizes: [10, 40]
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