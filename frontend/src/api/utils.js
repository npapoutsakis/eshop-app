// Function to check if the token is expired

export function isTokenExpired(expTimestamp) {
  const expDate = new Date(expTimestamp * 1000);
  const currentTime = new Date();
  return currentTime > expDate;
}
