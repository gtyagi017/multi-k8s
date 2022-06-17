import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import OtherPage from './OtherPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className='App-title'>Welcome to React</h1>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </header>
          {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>

      //     {/* <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a> */}
    );
  };
}

export default App;
