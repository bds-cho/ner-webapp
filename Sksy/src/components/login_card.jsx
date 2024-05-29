import React, { Component } from 'react';


class Login_card extends Component {
    state = {}
    render() {
        return <div class="card" style={{width: '30rem'}}>
        <div className="card-body">
            <img src="/assets/login.jpg" className="card-img-top" alt="..."/>
           
          <h5 className="card-title">Login</h5>
          <p className="card-text">Hier können sie sich einloggen um ihre Daten einzusehen und zu bearbeiten .</p>
          <a href="/" class="btn btn-primary">Login</a>
        </div>
        </div>;



    }
}

export default Login_card;