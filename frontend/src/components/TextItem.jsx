import React from "react";
import { Card } from "react-bootstrap";
import "../styles/TextItem.css";

const TextItem = ({ text }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TextItem;
