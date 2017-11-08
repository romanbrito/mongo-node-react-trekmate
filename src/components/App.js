import React, {Component} from 'react';
import Header from './Header';

class App extends Component {
  state = {
    pageHeader: 'Trekmate App'
  };
  componentDidMount(){
    // ajax,  timers, listeners
  }
  componentWillUnmount () {
    // clean timers, listeners
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          ---
        </div>
      </div>
    );
  }
}

export default App;