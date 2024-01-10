// Function to check if the token is expired
export function isTokenExpired(expTimestamp) {
  const expDate = new Date(expTimestamp * 1000);
  const currentTime = new Date();
  return currentTime > expDate;
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
