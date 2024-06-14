export async function addUserData(text, is_public) {
  const response = await fetch("/api/add_data/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + yourAuthToken, // Ensure user is authenticated
    },
    body: JSON.stringify({
      text: text, // string
      is_public: is_public, // bool
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
}

// Function to fetch all user data
export async function getUserDataAll() {
  try {
    const response = await fetch("/get_user_data_all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    console.log(response.headers.get("content-type"));
    const data = await response.json();
    console.log("All User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all user data:", error);
  }
}

// NOT USED YET:
async function fetchUserDataPublic() {
  try {
    const response = await fetch("/get_public_user_data/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Public User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching public user data:", error);
  }
}

async function fetchUserDataPrivate() {
  try {
    const response = await fetch("/get_private_user_data/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Private User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching private user data:", error);
  }
}

async function fetchAllDataPublic() {
  try {
    const response = await fetch("/get_all_public_data/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("All Public Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all public data:", error);
  }
}
