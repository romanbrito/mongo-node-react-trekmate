import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';

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
      {currentContestId: contestId},
      `/contest/${contestId}` // backtick template literals
    );
    // lookup the contest
    this.setState({
      pageHeader: this.state.contests[contestId].contestName,
      currentContestId: contestId
    });
  };

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.state.contests[this.state.currentContestId]} />;
    }
    return <ContestList
      onContestClick={this.fetchContest}
      contests={this.state.contests}/>;
  }

  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader}/>
        {this.currentContent()}
      </div>
    );
  }
}

export default App;