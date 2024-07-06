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
      <Card.Body className="pt-2">
        <Badge className="font-monospace" bg={is_public ? "success" : "danger"}>
          {is_public ? "Public" : "Private"}
        </Badge>
        <Card.Text className="mt-2 text-start">
          {parse(analyzed_text)}
        </Card.Text>
        <div className="d-flex justify-content-end gap-2">
          <button className="edit-button" onClick={onEdit}>
            Bearbeiten <FontAwesomeIcon className="ms-1" icon={faEdit} />
          </button>
          <button className="delete-button" onClick={onDelete}>
            Löschen <FontAwesomeIcon className="ms-1" icon={faTrashAlt} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TextItem;
