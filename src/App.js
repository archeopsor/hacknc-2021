import Cloud from './components/Cloud.js';
import './App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {words: state.words};
}

function App(store) {
  return (
    <div>
      <Cloud store={store} />
    </div>
  );
}

export default connect(mapStateToProps)(App);
