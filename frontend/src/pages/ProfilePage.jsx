import React from "react";
import { Container, Card } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
import {
  useGetUserDataAll,
  useGetUserDataPrivate,
  useGetUserDataPublic,
} from "../api/database_communication.js";
import TextItem from "../components/TextItem.jsx";

function Profile() {
  const { data: user } = useGetSession();

  const { data: userDataAll } = useGetUserDataAll();

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <h6>{user.username}</h6>
          </Card.Title>

          <div>
            <h5>All data:</h5>
            {userDataAll && userDataAll.length > 0 ? (
              userDataAll.map((item, index) => (
                <TextItem key={index} text={item.text}></TextItem>
              ))
            ) : (
              <p>No user data available</p>
            )}

            <h5>Public data:</h5>
            {userDataAll && userDataAll.length > 0 ? (
              userDataAll
                .filter((item) => {
                  return item.is_public;
                })
                .map((item, index) => (
                  <TextItem key={index} text={item.text}></TextItem>
                ))
            ) : (
              <p>No public user data available</p>
            )}

            <h5>Private data:</h5>
            {userDataAll && userDataAll.length > 0 ? (
              userDataAll
                .filter((item) => {
                  return !item.is_public;
                })
                .map((item, index) => (
                  <TextItem key={index} text={item.text}></TextItem>
                ))
            ) : (
              <p>No private user data available</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
