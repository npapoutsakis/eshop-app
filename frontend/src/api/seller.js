// Seller functions
import { decodeJwt, Logout } from "../utils/login";

const url = "http://localhost:5000/api/products/";

function isTokenExpired(expTimestamp) {
  const expDate = new Date(expTimestamp * 1000);
  const currentTime = new Date();
  return currentTime > expDate;
}

async function checkToken(token) {
  if (isTokenExpired(token.exp)) {
    alert(
      `{"Access Denied": "Token expired, you will be redirected back to login page!"}`
    );

    await Logout();

    window.location.reload();

    return false;
  }
}

// add product to database
async function addProduct(data) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

//update product with id
async function updateProduct(id, data) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// delete a product from database
async function deleteProduct(id) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { addProduct, deleteProduct, updateProduct };
