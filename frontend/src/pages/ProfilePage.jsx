import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
import { getUserDataAll } from "../api/database_communication.js";

function Profile() {
  const { data } = useGetSession();
  const [userData, setUserData] = useState(null); // State to hold fetched user data

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserDataAll();
        setUserData(userData); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching all user data:", error);
      }
    }
    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{"My Profile"}</Card.Title>
          <div>
            <p>{data.username}</p>
          </div>

          {/* display user data - private and public */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
