import { Kafka, Partitioners } from "kafkajs";
import handleProducts from "./handleProducts.js";

// Initialize kafka client for product service
const kafka = new Kafka({
  clientId: "product-app",
  brokers: ["kafka:19092"],
  retry: {
    initialRetryTime: 2000,
    retries: 5,
  },
});

// init product-service producer
const producer = kafka.producer({
  allowAutoTopicCreation: true,
  createPartitioner: Partitioners.LegacyPartitioner,
});

// send orders to order-service
async function sendOrders(msg) {
  await producer.connect();

  await producer.send({
    topic: "productsProducer",
    messages: [
      {
        value: JSON.stringify(msg),
      },
    ],
  });

  await producer.disconnect();
}

// init product-service consumer
const consumer = kafka.consumer({
  groupId: "products-group",
  allowAutoTopicCreation: true,
});

// fetch the order and check items on the database
async function fetchProductsFromOrderTopic() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["ordersProducer"] });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMsg = JSON.parse(message.value);

        console.log(jsonMsg);
        const result = await handleProducts(jsonMsg);

        const statusMessage = {
          id: jsonMsg.id,
          status: result ? "Success" : "Rejected",
        };

        // Pass the order status to order service
        await sendOrders(statusMessage);
      },
    });
  } catch (error) {
    await consumer.disconnect();
    console.error("Error in fetchProductsFromOrderTopic:", error.message);
  }
}

setTimeout(async () => {
  try {
    await fetchProductsFromOrderTopic();
  } catch (error) {
    console.log(error.message);
  }
}, 1000);

export default kafka;
