import React, {Component} from 'react'
// import picname from 'pic.jpg'
// import picname from 'pic.jpg'
import './App.css'
import Navbar from './components/navbar'
import LoginPage from './pages/LoginPage';
import NewAccountPage from './pages/NewAccountPage';


class App extends Component {
  state = {  } 
  render() {
    return (
        <React.Fragment>
        <Navbar/>
        <div className="container mt-4">
            <h1>Willkommen auf unserer Webseite!</h1>
            {/* Hier kannst du weitere Inhalte hinzufügen */}
        </div>
    </React.Fragment>
    );
}
}


export default App;
