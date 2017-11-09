import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import ContestList from './ContestList';

const pushState = (obj, url) =>  //browser history for html5
  window.history.pushState(obj, '', url);

class App extends Component {
  state = {
    pageHeader: 'Trekmate App',
    contests: this.props.initialContests
  };

  componentDidMount() {
    // ajax,  timers, listeners
    axios.get('/api/contests')
      .then(resp => {
        this.setState({
          contests: resp.data.contests
        });
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    // clean timers, listeners
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}` // backtick template literals
    );
  };

  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader}/>
        <ContestList
          onContestClick={this.fetchContest}
          contests={this.state.contests}/>
      </div>
    );
  }
}

export default App;