import { Kafka, Partitioners } from "kafkajs";
import handleProducts from "./handleProducts.js";

// Initialize kafka client for product service
const kafka = new Kafka({
  clientId: "products-app",
  brokers: ["localhost:8097"],
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
        const result = await handleProducts(jsonMsg);

        // now we have to return a success of reject for the order
        if (result) {
          const message = {
            id: jsonMsg.id,
            status: "Success",
          };

          // connect the producer and send a message to order-service
          await sendOrders(message);
        } else {
          const message = {
            id: jsonMsg.id,
            status: "Rejected",
          };

          await sendOrders(message);
        }
      },
    });

    await consumer.disconnect();
  } catch (error) {
    await consumer.disconnect();
    console.log(error.message);
  }
}

// add a delay of 2s to fetch correctly
setTimeout(async () => {
  try {
    await fetchProductsFromOrderTopic();
  } catch (error) {
    console.log(error.message);
  }
}, 2000);

export default kafka;
