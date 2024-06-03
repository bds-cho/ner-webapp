import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class AnalyseCard extends Component {
  render() {
    return (
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src="/assets/untersuchen.jpg" />
        <Card.Body>
          <Card.Title>Text Analyse</Card.Title>
          <Card.Text>Analysiere deinen Text mit unserem Tool.</Card.Text>
          <Button variant="primary" href="/text-analyse">
            Analyse-Tool
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default AnalyseCard;
