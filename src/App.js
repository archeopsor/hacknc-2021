import './App.css';
import { connect } from "./react-redux";

const mapStateToProps = (state) => {
  return {words: state.words};
}

function App(store) {
  return (
    <div>

    </div>
  );
}

export default connect(mapStateToProps)(App);
