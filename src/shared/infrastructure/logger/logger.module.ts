import { Logger, Module } from '@nestjs/common';
import { ILogger } from '@src/libs/ports/logger.port';

@Module({
  providers: [
    {
      provide: ILogger,
      useExisting: Logger,
    },
    Logger,
  ],
  exports: [ILogger],
})
export class LoggerModule {}
