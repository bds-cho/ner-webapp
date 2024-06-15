import { useQuery } from "@tanstack/react-query";

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

export function useGetUserDataAll() {
  const query = useQuery({
    queryKey: ["get_user_data_all"],
    queryFn: getUserDataAll,
    retry: 1,
  });
  return query;
}

// Function to fetch all user data
async function getUserDataAll() {
  try {
    const response = await fetch("/api/get_user_data_all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("All User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all user data:", error);
  }
}

export function useGetUserDataPublic() {
  const query = useQuery({
    queryKey: ["get_user_data_public"],
    queryFn: getUserDataPublic,
    retry: 1,
  });
  return query;
}

async function getUserDataPublic() {
  try {
    const response = await fetch("/api/get_user_data_public/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Public User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching public user data:", error);
  }
}

export function useGetUserDataPrivate() {
  const query = useQuery({
    queryKey: ["get_user_data_private"],
    queryFn: getUserDataPrivate,
    retry: 1,
  });
  return query;
}

async function getUserDataPrivate() {
  try {
    const response = await fetch("/api/get_user_data_private/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Private User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching private user data:", error);
  }
}

export function useGetPublicDataAll() {
  const query = useQuery({
    queryKey: ["get_public_data_all"],
    queryFn: getPublicDataAll,
    retry: 1,
  });
  return query;
}

async function getPublicDataAll() {
  try {
    const response = await fetch("/api/get_public_data_all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("All Public Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all public data:", error);
  }
}
