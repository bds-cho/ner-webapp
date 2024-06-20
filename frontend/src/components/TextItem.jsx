import React from "react";
import { Badge, Card, Col, Row, Button } from "react-bootstrap";
import "../styles/TextItem.css";
import "../styles/DeleteButton.css";
import "../styles/EditButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const TextItem = ({ key_prop, analyzed_text, is_public, onDelete, onEdit }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <Badge bg={is_public ? "success" : "danger"}>
              {is_public ? "Public" : "Private"}
            </Badge>
          </Col>
          <Col className="text-center">
            <Card.Text>{parse(analyzed_text)}</Card.Text>
          </Col>
          <Col xs="auto">
            <button className="delete-button" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Col>
          <Col xs="auto">
            <button className="edit-button" onClick={onEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TextItem;
