import React from "react";
import { Card } from "react-bootstrap";
import "../styles/FeedTextItem.css";
import parse from "html-react-parser";

const FeedTextItem = ({ user, analyzed_text }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <div className="text-item-header">
          <div className="user-info">
            <h2 className="user-name">
              {user.first_name} {user.last_name}
            </h2>
            <h5 className="user-username">{user.username}</h5>
          </div>
        </div>
        <hr className="divider" />
        <Card.Text className="text-content">{parse(analyzed_text)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeedTextItem;
