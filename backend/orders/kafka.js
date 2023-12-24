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

async function checkOrderStatus() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["productsProducer"] });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMsg = JSON.parse(message.value);

        // handle the order (setting correct status)
        await handleOrder(jsonMsg);
      },
    });

    await consumer.disconnect();
  } catch (error) {
    await consumer.disconnect();
    console.log(error.message);
  }
  return;
}

// add a delay of 2s to check correctly
setTimeout(async () => {
  try {
    await checkOrderStatus();
  } catch (error) {
    console.log(error.message);
  }
}, 2000);

export default kafka;
