import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import ContestList from './ContestList';

class App extends Component {
  state = {
    pageHeader: 'Trekmate App',
    contests: this.props.initialContests
  };
  componentDidMount(){
    // ajax,  timers, listeners
    axios.get('/api/contests')
      .then(resp => {
        this.setState({
          contests: resp.data.contests
        });
      })
      .catch(console.error);
  }
  componentWillUnmount () {
    // clean timers, listeners
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <ContestList contests={this.state.contests} />
      </div>
    );
  }
}

export default App;