import { Kafka, Partitioners } from "kafkajs";
import handleOrder from "./handleOrder.js";

// Initialize kafka client for order service
const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["kafka:19092"],
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

async function sendOrders(msg) {
  await producer.connect();

  await producer.send({
    topic: "ordersProducer",
    messages: [
      {
        value: JSON.stringify(msg),
      },
    ],
  });

  await producer.disconnect();
}

// init order-service consumer
const consumer = kafka.consumer({
  groupId: "orders-group",
  allowAutoTopicCreation: true,
});

// Check order status and handle orders
async function checkOrderStatus() {
  try {
    await consumer.connect();

    await consumer.subscribe({ topics: ["productsProducer"] });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMsg = JSON.parse(message.value);

        console.log(jsonMsg);

        // Handle the order (setting correct status)
        await handleOrder(jsonMsg);
      },
    });
  } catch (error) {
    await consumer.disconnect();
    console.error("Error in checkOrderStatus:", error.message);
  }
}

setTimeout(async () => {
  try {
    await checkOrderStatus();
  } catch (error) {
    console.log(error.message);
  }
}, 1000);

export { sendOrders };
