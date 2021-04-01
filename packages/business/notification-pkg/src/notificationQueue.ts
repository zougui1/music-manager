import { handleManyMessages, ManyMessages, Message } from 'mq-pkg';
import { Observable, interval, of, pipe } from 'rxjs';;
import { map, groupBy, mergeMap, toArray, window, reduce } from 'rxjs/operators';
import { MusicDownloaded, FullDownloadProgress, DownloadType, FullMusicDownloadInit, MusicDownloadComplete } from 'types-pkg';
import _ from 'lodash';

import { mqClient } from './mq';
import * as messageTypes from './messageTypes';

const BUFFER_TIME = 300;

/*const groupByUser = (options: { bufferTime: number }) => {
  return pipe(
    // group all the messages consumed within XXX milliseconds
    window(interval(options?.bufferTime ?? BUFFER_TIME)),

    mergeMap(msg$ => msg$.pipe(
      // group all the progressions by user
      groupBy(msg => msg.body.userId),
      mergeMap(group => group.pipe(toArray())),

      map(group => {
        // group all the progressions from a user, by track
        const groupedGroup = _.groupBy(group, msg => {
          switch (msg.body.type) {
            case DownloadType.track:
              return msg.body.track.url;
            case DownloadType.playlist:
              return msg.body.url;

            //default:
            //  throw new Error(`Invalid download type "${msg.body.type}"`);
          }
        });

        // acknoledges every progression except the last one which we return
        return Object.values(groupedGroup).map(m => {
          const reversed = m.reverse();
          _.tail(reversed).forEach(m => m.ack());
          return reversed[0];
        });
      }),
    )),

    // wrap the progressions into an object
    map(progressions => handleManyMessages<FullDownloadProgress>(progressions)),
  );
}*/

export const observeMusicDownloadProgress = (options?: ObserveMusicDownloadProgressOptions): Observable<ManyMessages<FullDownloadProgress>> => {
  return mqClient
    .observe<FullDownloadProgress>([messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS])
    .pipe(
      //groupByUser({ bufferTime: options?.bufferTime ?? BUFFER_TIME }),
      // group all the messages consumed within XXX milliseconds
      window(interval(options?.bufferTime ?? BUFFER_TIME)),

      mergeMap(msg$ => msg$.pipe(
        // group all the progressions by user
        groupBy(msg => msg.body.userId),
        mergeMap(group => group.pipe(toArray())),

        map(group => {
          // group all the progressions from a user, by track
          const groupedGroup = _.groupBy(group, msg => {
            switch (msg.body.type) {
              case DownloadType.track:
                return msg.body.track.url;
              case DownloadType.playlist:
                return msg.body.url;

              //default:
              //  throw new Error(`Invalid download type "${msg.body.type}"`);
            }
          });

          // acknoledges every progression except the last one which we return
          return Object.values(groupedGroup).map(m => {
            const [lastMessage, ...messages] = m.reverse();
            messages.forEach(m => m.ack());
            return lastMessage;
          });
        }),
      )),

      // wrap the progressions into an object
      map(progressions => handleManyMessages<FullDownloadProgress>(progressions)),
    );
}

export const observeMusicDownloadInit = (): Observable<Message<FullMusicDownloadInit>> => {
  console.log('observeMusicDownloadInit')
  return mqClient.observe<FullMusicDownloadInit>([messageTypes.NOTIFY_MUSIC_DOWNLOAD_INIT]);
}

export const observeMusicDownloaded = (): Observable<Message<MusicDownloaded>> => {
  // @ts-ignore
  return mqClient
    .observe<MusicDownloaded>([messageTypes.NOTIFY_MUSIC_DOWNLOADED])
    /*.pipe(
      //groupByUser({ bufferTime: options?.bufferTime ?? BUFFER_TIME }),
      // group all the messages consumed within XXX milliseconds
      window(interval(options?.bufferTime ?? BUFFER_TIME)),

      mergeMap(msg$ => msg$.pipe(
        // group all the progressions by user
        groupBy(msg => msg.body.userId),
        mergeMap(group => group.pipe(toArray())),
      )),

      // wrap the progressions into an object
      map(progressions => handleManyMessages<MusicDownloaded>(progressions)),
    );*/
}

export const observeMusicDownloadComplete = (): Observable<ManyMessages<MusicDownloadComplete>> => {
  // @ts-ignore
  return mqClient
    .observe<MusicDownloadComplete>([messageTypes.NOTIFY_MUSIC_DOWNLOAD_COMPLETE])
    /*.pipe(
      //groupByUser({ bufferTime: options?.bufferTime ?? BUFFER_TIME }),
      // group all the messages consumed within XXX milliseconds
      window(interval(options?.bufferTime ?? BUFFER_TIME)),

      mergeMap(msg$ => msg$.pipe(
        // group all the progressions by user
        groupBy(msg => msg.body.userId),
        mergeMap(group => group.pipe(toArray())),
      )),

      // wrap the progressions into an object
      map(progressions => handleManyMessages<MusicDownloadComplete>(progressions)),
    );*/
}

export const notifyMusicDownloadProgress = (data: FullDownloadProgress) => {
  mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS });
}

export const notifyMusicDownloadInit = (data: FullMusicDownloadInit) => {
  mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOAD_INIT });
}

export const notifyMusicDownloaded = (data: MusicDownloaded) => {
  mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOADED });
}

export const notifyMusicDownloadComplete = (data: MusicDownloadComplete) => {
  mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOAD_COMPLETE });
}

export interface ObserveMusicDownloadProgressOptions {
  bufferTime?: number;
}
