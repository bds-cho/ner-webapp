export async function loginUser(email, password) {
  fetch("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle successful response from Django
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.error("There was a problem with your fetch operation:", error);
    });
}

export async function registerUser(email, password, name, surname) {
  fetch("/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle successful response from Django
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.error("There was a problem with your fetch operation:", error);
    });
}
