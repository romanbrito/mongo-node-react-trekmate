import React, {Component} from 'react';
import Header from './Header';

class App extends Component {
  state = {
    pageHeader: 'Trekmate App'
  };
  componentDidMount(){
    console.log('did Mount');
    debugger;
    // ajax,  timers, listeners
  }
  componentWillUnmount () {
    console.log('will Unmount');
    debugger;
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