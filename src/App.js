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
      <Cloud store={store} />
      <UploadBox store={store} />
    </div>
  );
}

export default connect(mapStateToProps)(App);
