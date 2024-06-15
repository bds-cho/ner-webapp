import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addUserData } from "../api/database_communication.js";

function TextAnalysePage() {
  const [text, setText] = useState("");
  const [fileContent, setFileContent] = useState("");

  // Handle text area input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  //  TODO: CALL API ON SUBMIT (BACKEND NOT IMPLEMENTED YET)
  // Handle form submit
  const handleSubmit = async () => {
    if (text && fileContent) {
      console.error(
        "Entweder Text eingeben oder Datei hochladen, nicht beides",
      );
      return;
    }

    if (!text && !fileContent) {
      console.error("Geben Sie das Text ein oder laden Sie eine Datei hoch");
      return;
    }

    addUserData(text, true);
  };

  return (
    <div>
      <br />
      <h1>Text Analyse</h1>
      <p>Geben Sie hier Ihren Text ein oder laden Sie eine Datei hoch.</p>
      <br />
      <Container>
        <Form>
          <Form.Group controlId="formTextarea">
            <Form.Label>Geben Sie hier Ihren Text ein</Form.Label>
            <Form.Control
              as="textarea"
              value={text}
              onChange={handleTextChange}
              placeholder="Geben Sie hier das Text ein"
              rows={10}
              cols={50}
            />
          </Form.Group>
          <Form.Group controlId="formFileUpload" className="mt-3">
            <Form.Label>Datei hochladen</Form.Label>
            <Form.Control
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              lang="de"
            />
          </Form.Group>
        </Form>
      </Container>
      <br />
      <Button className="mt-3" variant="primary" onClick={handleSubmit}>
        Analysieren
      </Button>
    </div>
  );
}

export default TextAnalysePage;
