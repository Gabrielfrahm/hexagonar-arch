

import pino  from "pino";
import { LoggerPort } from "../../../ports/out/logger/logger.interface";
// import * as apm from 'elastic-apm-node';
// apm.start({
//   // Configurações do APM
//   serviceName: 'loggers',
//   serverUrl: 'http://localhost:8200',
//   // Outras configurações necessárias
//   logger: pino({ level: 'info' }),
//   secretToken: '',
//   opentelemetryBridgeEnabled: true,
//   environment: 'development',
//   logLevel: 'info'
// });
// apm.isStarted()
// apm.getServiceName()

export class PinoElasticsearchLoggerAdapter implements LoggerPort {

  logInfo(message: string, context?: any): void {
    pino().info(`${message + context}`);
  }
}

// const apm = require('elastic-apm-node').start({
//   // Configurações do APM
//   serviceName: 'loggers',
//   serverUrl: 'http://localhost:8200',
//   // Outras configurações necessárias
//   logger: pino({ level: 'info' }),
//   // Override the service name from package.json
//   // Allowed characters: a-z, A-Z, 0-9, -, _, and space

//   // Use if APM Server requires a secret token
//   secretToken: '',
//   opentelemetryBridgeEnabled: true,
//   // Set the service environment
//   environment: 'staging'
// });

// A classe ApmLogger que implementa LoggerPort
// export class PinoElasticsearchLoggerAdapter implements LoggerPort {
//   logInfo(message: string, context: any = {}): void {
//     // Adiciona o log ao APM
//    console.log(message)

//   }
// }
