import { RmqContext } from '@nestjs/microservices';

export function ackMessage(context: RmqContext) {
  const channel = context.getChannelRef();
  const originalMsg = context.getMessage();

  channel.ack(originalMsg);
}
