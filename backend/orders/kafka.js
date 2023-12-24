import { Kafka, Partitioners } from "kafkajs";
import handleOrder from "./handleOrder.js";

// Initialize kafka client for order service
const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:8097"],
  retry: {
    initialRetryTime: 2000,
    retries: 5,
  },
});

// init order-service producer
const producer = kafka.producer({
  allowAutoTopicCreation: true,
  createPartitioner: Partitioners.LegacyPartitioner,
});

export async function sendOrders(msg) {
  console.log("Before producer connect");
  await producer.connect();
  console.log("After producer connect");

  await producer.send({
    topic: "ordersProducer",
    messages: [
      {
        value: JSON.stringify(msg),
      },
    ],
  });
  console.log("After producer send");

  await producer.disconnect();
  console.log("After producer disconnect");
}

// init order-service consumer
const consumer = kafka.consumer({
  groupId: "orders-group",
  allowAutoTopicCreation: true,
});

// Check order status and handle orders
async function checkOrderStatus() {
  try {
    console.log("Before consumer connect");
    await consumer.connect();
    console.log("After consumer connect");

    await consumer.subscribe({ topics: ["productsProducer"] });
    console.log("After consumer subscribe");

    await consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMsg = JSON.parse(message.value);

        // Handle the order (setting correct status)
        await handleOrder(jsonMsg);
      },
    });
    console.log("After consumer subscribe");
  } catch (error) {
    console.error("Error in checkOrderStatus:", error.message);
  } finally {
    await consumer.disconnect();
  }
}

(async () => {
  try {
    await checkOrderStatus();
  } catch (error) {
    console.error("Error in main execution:", error.message);
  }
})();

export default kafka;
