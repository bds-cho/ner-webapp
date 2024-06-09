import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class NewAccountCard extends Component {
  render() {
    return (
      <Card style={{ width: "30rem" }}>
        <Card.Img
          variant="top"
          src="/assets/signup.png"
          className="custom-card-img"
        />
        <Card.Body>
          <Card.Title>Account anlegen</Card.Title>
          <Card.Text>
            Hier können sie einen Account anlegen um unsere Features zu nutzen
            und ihre Daten zu speichern.
          </Card.Text>
          <Button variant="primary" href="/new-account">
            Registrieren
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default NewAccountCard;
