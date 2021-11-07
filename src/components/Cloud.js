import ReactWordcloud from 'react-wordcloud';
import './Cloud.css'

const Cloud = (store) => {
    var store_data = store.store.store.getState()

    const determineColor = (value) => {
        const freq = value / store_data.data.total;
        const colors = new Map([
            [0.05, 'blue'],
            [0.1, 'navy'],
            [0.15, 'indigo'],
            [0.2, 'blueviolet'],
            [0.3, 'purple'],
            [0.4, 'magenta'],
            [0.5, 'crimson'],
        ])

        for (const key of colors) {
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
        fontSizes: [5, 15]
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