import { Message, ManyMessages } from './types';

export const handleManyMessages = (messages: Message[]): ManyMessages => {
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
