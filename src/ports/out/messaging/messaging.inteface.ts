export interface MessagingPort {
  connect() : Promise<void>;
  publish(queue: string, message: string): Promise<void>;
  consume(queue: string, callback: (message: unknown | string) => void): Promise<void>;
}
