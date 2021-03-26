import { handleManyMessages, ManyMessages } from 'mq-pkg';
import { Observable, interval } from 'rxjs';;
import { map, groupBy, mergeMap, toArray, window } from 'rxjs/operators';

import { mqClient } from './mq';
import * as messageTypes from './messageTypes';

const BUFFER_TIME = 300;

export const observeMusicDownloadProgress = (options?: ObserveMusicDownloadProgressOptions): Observable<ManyMessages> => {
  return mqClient
    .observe([messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS])
    .pipe(
      // group all the messages consumed within XXX milliseconds
      window(interval(options?.bufferTime ?? BUFFER_TIME)),
      // group consumed messages by video ID and turn them into arrays
      // TODO group by user ID
      mergeMap(msg$ => msg$.pipe(
        groupBy(msg => msg.body.videoId),
        mergeMap(group => group.pipe(toArray()))
      )),
      // turn an array of messages into an object wrapping the messages
      map(messages => handleManyMessages(messages)),
    );
}

export const notifyMusicDownloadProgress = (data: any) => {
  mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS });
}

export interface ObserveMusicDownloadProgressOptions {
  bufferTime?: number;
}
