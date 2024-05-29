import React, { Component } from 'react';
import './App.css'
import Navigationbar from './components/navbar'
import Analyse from './components/analyse'
import Login_card from './components/login_card'
import NewACC_card from './components/NewACC_card'
import Footer from './components/Footer'

import LoginPage from './pages/LoginPage';
import NewAccountPage from './pages/NewAccountPage';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigationbar />
        <div className="container mt-4">
          <h1>Willkommen auf unserer Text-Analyse Webseite!</h1>
          <div className="analyse-container">
            <Analyse /><Login_card /><NewACC_card />
          </div>
        
        </div>
        <Footer />

      </React.Fragment>

    );
  }
}

export default App;