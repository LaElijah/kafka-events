import eventType from "./eventType.js";
import { Kafka } from 'kafkajs';



export default async function queueMessage(event) {
   
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka:9092'],
      })
    
    
    const producer = kafka.producer({
        groupId: 'kafka'
    });
    
    await producer.connect();


    const eventData = {
        ...event,
    }

    const success = await producer.send({
        topic: 'messaging-service',
        messages: [
            {value: eventType.toBuffer(event)}
        ]
    });

    if (success) {
        console.log("Message queued successfully");
    } else {
        console.log("Message queue failed");
    }
}
