import React from "react";
import { Card } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
import { useGetUserDataAll } from "../api/database_communication.js";
import TextItem from "../components/TextItem.jsx";

function Profile() {
  const { data: user } = useGetSession();

  const { data: userDataAll } = useGetUserDataAll();
  return (
    <Card
      style={{
        width: "100%",
        margin: "auto",
        maxWidth: "600px",
        marginTop: "20px",
      }}
    >
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
              <TextItem key={index} {...item}></TextItem>
            ))
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Profile;
