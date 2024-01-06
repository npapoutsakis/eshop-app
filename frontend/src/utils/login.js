// Utility functions

export async function Register(event, username, email, password, role) {
  event.preventDefault();
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "admin-cli");
    urlencoded.append("client_secret", "VV5OBIA9ZZa0ERoFgubXuIfwQTutTl7W");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const first_response = await fetch(
      "http://localhost:8080/auth/realms/master/protocol/openid-connect/token",
      requestOptions
    );

    if (first_response.ok) {
      const adminAccessToken = await first_response.json();
      const token = adminAccessToken.access_token;

      // Register after getting the access token
      // now using data-raw curl command
      var newHeaders = new Headers();
      newHeaders.append("Content-Type", "application/json");
      newHeaders.append("Authorization", "Bearer " + token);

      // --data-raw
      var raw = JSON.stringify({
        email: email,
        enabled: "true",
        username: username,
        attributes: {
          client_id: "frontend-app",
        },
        groups: [role],
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      });

      //Sending the post request to keycloak
      var newRequestOptions = {
        method: "POST",
        headers: newHeaders,
        body: raw,
        redirect: "follow",
      };

      const register_user = await fetch(
        "http://localhost:8080/auth/admin/realms/eshop/users",
        newRequestOptions
      );

      if (register_user.ok) {
        console.log("Registration Succesfull");
        window.location.reload();
      } else {
        console.log("error");
      }
    } else {
      const error = await first_response.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }

  return;
}

export async function Login(event, username, password) {
  event.preventDefault();
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("client_id", "frontend-app");
    urlencoded.append("client_secret", "NeOBItxA6VrnhaDsHD8226ObY7DD3odl");
    urlencoded.append("grant_type", "password");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/token",
      requestOptions
    );

    if (response.ok) {
      const login = await response.json();
      const token = login.access_token;
      const logout_token = login.refresh_token;

      const decodeToken = await decodeJwt(token);
      localStorage.setItem("username", decodeToken.preferred_username);
      localStorage.setItem("email", decodeToken.email);
      localStorage.setItem(
        "role",
        decodeToken.realm_access.roles[0] === "Customer"
          ? decodeToken.realm_access.roles[0]
          : decodeToken.realm_access.roles[1]
      );
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", logout_token);
      localStorage.setItem("isAuthenticated", true);
    } else {
      const err = await response.json();
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }

  return;
}

export async function Logout() {
  try {
    // Construct request
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("refresh_token", localStorage.getItem("refresh_token"));
    urlencoded.append("client_id", "frontend-app");
    urlencoded.append("client_secret", "NeOBItxA6VrnhaDsHD8226ObY7DD3odl");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/logout",
      requestOptions
    );

    if (response.ok) {
      console.log("Logout Successfull");
      // alert("Logout Successfull");
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function updateToken() {
  try {
    // Construct request
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "frontend-app");
    urlencoded.append("grand_type", "refresh_token");
    urlencoded.append("client_secret", "NeOBItxA6VrnhaDsHD8226ObY7DD3odl");
    urlencoded.append("refresh_token", localStorage.getItem("refresh_token"));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(
      "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/token",
      requestOptions
    );

    if (response.ok) {
      // set new refresh and access token
      const new_login = await response.json();

      const new_access_token = new_login.access_token;
      const new_refresh_token = new_login.refresh_token;

      localStorage.setItem("access_token", new_access_token);
      localStorage.setItem("refresh_token", new_refresh_token);
    } else {
      const err = await response.json();
      console.log(err);
    }
  } catch (error) {
    console.error("Error while updating token", error);
  }
  return;
}

export async function checkToken() {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("token", localStorage.getItem("access_token"));
    urlencoded.append("client_id", "frontend-app");
    urlencoded.append("client_secret", "NeOBItxA6VrnhaDsHD8226ObY7DD3odl");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(
      "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/token",
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();

      // check if token is active
      if (data.active) {
        return true;
      } else {
        return updateToken();
      }
    } else {
      const err = await response.json();
      console.log(err);
    }
  } catch (error) {
    console.error("Error checking the token", error);
  }
}

export function decodeJwt(jwtToken) {
  const base64Url = jwtToken.split(".")[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace Base64 URL encoding characters
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  ); // Decode Base64 and handle URI component encoding

  return JSON.parse(jsonPayload);
}
