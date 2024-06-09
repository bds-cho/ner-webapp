import React from "react";
import { Card, Button } from "react-bootstrap";

export function LoginCard() {
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Img variant="top" src="/assets/login.jpg" />
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Card.Text>
          Hier können sie sich einloggen um ihre Daten einzusehen und zu
          bearbeiten.
        </Card.Text>
        <Button variant="primary" href="/login">
          Login
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
