import Kafka, { Partitioners } from "kafkajs";
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

async function checkOrderStatus(message) {
  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["productsProducer"] });

    await consumer.run({
      eachMessage: async ({ message, heartbeat }) => {
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

module.exports = {
  kafkaProducer: sendOrders,
  kafkaConsumer: checkOrderStatus,
};
