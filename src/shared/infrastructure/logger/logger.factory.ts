import { Logger } from '@nestjs/common';
import { ILogger } from '@src/libs/ports/logger.port';

export function createLogger(name?: string): ILogger {
  return new Logger(name);
}
