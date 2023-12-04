export interface Connection {
  connection(): Promise<any>
  close(): Promise<any>
}
