import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) =>  //browser history for html5
  window.history.pushState(obj, '', url);

class App extends Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };
  state = this.props.initialData;

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
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
  };

  fetchContestList = () => {
    pushState(
      {currentContestId: null},
      '/' // backtick template literals
    );
    // lookup the contest
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if (this.state.currentContestId){
      return this.currentContest().contestName;
    }

    return 'Trekmate App';
  }

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest
        contestListClick={this.fetchContestList}
        {...this.currentContest()} />;
    }
    return <ContestList
      onContestClick={this.fetchContest}
      contests={this.state.contests}/>;
  }

  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()}/>
        {this.currentContent()}
      </div>
    );
  }
}

export default App;