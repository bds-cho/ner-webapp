import React, {Component} from 'react'
// import picname from 'pic.jpg'
// import picname from 'pic.jpg'
import './App.css'
import Navbar from './components/navbar'
import Analyse from './components/analyse'
import Login_card from './components/login_card'
import NewACC_card from './components/NewACC_card'

import LoginPage from './pages/LoginPage';
import NewAccountPage from './pages/NewAccountPage';


class App extends Component {
  state = {  } 
  render() {
    return (
        <React.Fragment>
        <Navbar/>
        <div className="container mt-4"></div>
            <h1>Willkommen auf unserer Text-Analyse Webseite!</h1>
        <div className="analyse-container">
        <Analyse/><Login_card/><NewACC_card/></div>
        
    </React.Fragment>
    );
}
}


export default App;
