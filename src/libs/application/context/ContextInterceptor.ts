import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestContextService } from './AppRequestContext';
import { v4 as uuidv4 } from 'uuid';
import { ILogger } from 'src/libs/ports/logger.port';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly logger: ILogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    let request;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest().user;
    }
    // request type is graphql
    request = context.getArgs()[2]?.req;

    /**
     * if we are using Sentry then it is better to implement it here
     */

    const transactionId = request.headers['x-transaction-id'] ?? uuidv4();
    RequestContextService.setRequestId(transactionId);

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`[TransactionId: ${transactionId}] Finished request`),
        ),
      );
  }
}
