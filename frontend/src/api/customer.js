// Customer functions

const url = "http://localhost:";
const orderPort = 5500;
const productsPort = 5000;

// send api request for products
async function getProducts() {
  try {
    const response = await fetch(url + productsPort + "/api/products", {
      method: "GET",
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
    const response = await fetch(url + productsPort + "/api/products:id", {
      method: "GET",
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
    const response = await fetch(url + productsPort + "/api/products:name", {
      method: "GET",
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
    const response = await fetch(
      url + productsPort + "/api/products:username",
      {
        method: "GET",
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
    const response = await fetch(url + orderPort + "/api/orders:username", {
      method: "GET",
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
async function makeOrder(data) {
  try {
    const response = await fetch(url + orderPort + "/api/orders:", {
      method: "POST",
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

export {
  getOrders,
  getProductById,
  getProductByName,
  getProductByUsername,
  getProducts,
  makeOrder,
};
