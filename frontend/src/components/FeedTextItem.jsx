import React from "react";
import { Card } from "react-bootstrap";
import "../styles/TextItem.css";

const FeedTextItem = ({ user, text }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <Card.Title>
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <h5>{user.username}</h5>
        </Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeedTextItem;
