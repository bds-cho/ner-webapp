import React, { Component } from 'react';


class Login_card extends Component {
    state = {}
    render() {
        return <div class="card" style={{width: '30rem'}}>
        <div className="card-body">
            <img src="/assets/untersuchen.jpg" className="card-img-top" alt="..."/>
           
          <h5 className="card-title">Account anlegen</h5>
          <p className="card-text">Hier können sie einen Account anlegen um unsere Features zu nutzen und ihre Daten zu speichern .</p>
          <a href="/" class="btn btn-primary">Registrieren</a>
        </div>
        </div>;



    }
}

export default Login_card;