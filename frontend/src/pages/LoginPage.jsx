import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { loginUser } from "../api/authentication";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      navigate("/text-analyse");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
      }}
    >
      <Row className="justify-content-md-center">
        <Col>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin} style={{ textAlign: "left" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-4"
              disabled={loginMutation.isLoading}
            >
              Login
            </Button>
            {loginMutation.isError && (
              <Alert variant="danger" className="mt-2">
                {loginMutation.error.message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default LoginPage;
