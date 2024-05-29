import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class NewACCard extends Component {
    render() {
      return (
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src="/assets/signup.png" />
          <Card.Body>
            <Card.Title>Account anlegen</Card.Title>
            <Card.Text>
              Hier können sie einen Account anlegen um unsere Features zu nutzen und ihre Daten zu speichern.
            </Card.Text>
            <Button variant="primary" href="/">Registrieren</Button>
          </Card.Body>
        </Card>
      );
    }
  }
  
  export default NewACCard;