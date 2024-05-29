import React, { Component } from 'react';


class Analyse extends Component {
    state = {}
    render() {
        return <div class="card" style={{width: '30rem'}}>
        <div className="card-body">
            <img src="/assets/untersuchen.jpg" className="card-img-top" alt="..."/>
           
          <h5 className="card-title">Text Analyse</h5>
          <p className="card-text">Analyse ihres Textes.</p>
          <a href="/" class="btn btn-primary">Analyse-Tool</a>
        </div>
        </div>;



    }
}

export default Analyse;