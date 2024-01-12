// Customer functions

import { Logout, decodeJwt } from "../utils/login.js";

const url = "http://34.118.92.179:";
const orderPort = 5500;
const productsPort = 5000;

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

// send api request for products
async function getProducts() {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + productsPort + "/api/products", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return false;
  }
}

async function getProductById(id) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + productsPort + "/api/products/" + id, {
      method: "GET",
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

async function getProductByName(name) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + productsPort + "/api/products/" + name, {
      method: "GET",
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

async function getProductByUsername(username) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(
      url + productsPort + "/api/products/" + username,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// send request to get orders
async function getOrders(username) {
  try {
    // check token
    await checkToken(decodeJwt(localStorage.getItem("access_token")));

    const response = await fetch(url + orderPort + "/api/orders/" + username, {
      method: "GET",
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

// post an order, send to order-service
async function makeOrder(data, totalprice) {
  // check token
  await checkToken(decodeJwt(localStorage.getItem("access_token")));

  // Decode cart structure
  const newOrderFormat = {
    products: [],
    total_price: totalprice,
    user_username: localStorage.getItem("username"),
  };

  for (let item in data) {
    const { title, quantity, id } = data[item];

    const product = {
      title: title,
      amount: quantity,
      product_id: id,
    };

    newOrderFormat["products"].push(product);
  }

  try {
    const response = await fetch(url + orderPort + "/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(newOrderFormat),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  getOrders,
  getProductById,
  getProductByName,
  getProductByUsername,
  getProducts,
  makeOrder,
};
