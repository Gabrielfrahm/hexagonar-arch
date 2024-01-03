import { MessagingPort } from "../../../ports/out/messaging/messaging.inteface";
import * as amqp from 'amqplib';

export class RabbitMQAdapter implements MessagingPort {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: string): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: false,
    });
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: amqp.ConsumeMessage  | string) => void): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: false,
    });
    this.channel.consume(queue, callback, { noAck: true });
  }

}
