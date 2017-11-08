import React, {Component} from 'react';
import Header from './Header';
import ContestPreview from './ContestPreview';
import data from '../testData.json';

class App extends Component {
  state = {
    pageHeader: 'Trekmate App',
    contests: []
  };
  componentDidMount(){
    // ajax,  timers, listeners
    this.setState({
      contests: data.contests
    });
  }
  componentWillUnmount () {
    // clean timers, listeners
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          {this.state.contests.map(contest =>
            <ContestPreview key={contest.id}{...contest } />
          )}
        </div>
      </div>
    );
  }
}

export default App;