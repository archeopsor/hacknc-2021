import Cloud from './components/Cloud.js';
import UploadBox from './components/UploadBox.js';
import './App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {words: state.words};
}

function App(store) {
  return (
    <div id="app-container">
      <h1><u>Tip of my Tongue</u></h1>
      <p>Enter an audio file, record your own audio, or type in some text to generate a word cloud with closely related nouns!</p>
      <p>This text or audio should contain a noun and then some descriptors. Longer phrases will take a longer time to finish, but will probably have better results. Check the bottom of this page for some things to try out!</p>
      <Cloud store={store} />
      <UploadBox store={store} />
      <div class="suggestions">
        <h3><u>Suggestions for phrases to try out:</u></h3>
        <ul>
          <li>House with rooms</li>
          <li>Countries with children</li>
          <li>Animal that can swim</li>
          <li>Bird with large wingspan</li>
          <li>Building where food is made</li>
          <li>Places to go</li>
          <li>Shop with food</li>
          <li>Dog breed</li>
          <li>Method to analyze data</li>
          {/* <li>Event to hack</li>
          <li>Programming language</li> */}
        </ul>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
