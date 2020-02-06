import React from 'react';
import logo from './images/logo.svg';
import FormModal from "./components/FormModal";
import Dashboard from "./components/Dashboard";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registered: false
    }
  }

  register = () => { this.setState({ registered: true }) }

  render() {
    return (
      <div className="app">
        {this.state.registered ?
          <Dashboard /> :
          <div className="register-page">
            <img src={logo} alt="logo" className="logo" />
            <button className="btn register" data-toggle="modal" data-target="#form-modal"> Register </button>
            <FormModal register={this.register} />
          </div>

        }
      </div>
    );
  }
}

export default App;
