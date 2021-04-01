import { Message, ManyMessages } from './types';

export const handleManyMessages = <TBody = unknown>(messages: Message<TBody>[]): ManyMessages<TBody> => {
  const ackAll = (allUpTo?: boolean | undefined): void => {
    for (const message of messages) {
      message.ack(allUpTo);
    }
  }

  return {
    ackAll,
    messages,
  };
}
