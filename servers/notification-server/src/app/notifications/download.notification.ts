import { observeMusicDownloadProgress, observeMusicDownloadInit, observeMusicDownloaded } from 'notification-pkg'
import { hubPublish } from 'hub-publish-pkg';
import { DownloadType } from 'types-pkg';

export const startDownloadNotifications = () => {
  observeMusicDownloadProgress()
    .subscribe(async ({ messages, ackAll }) => {
      const topic = new URL('http://localhost:3334/download/progress');
      topic.searchParams.append('user', messages[0].body.userId.toString());

      console.log(topic.toString())
      const data = {
        topic: topic.toString(),
        data: messages.map(progression => progression.body),
      };

      await hubPublish(data);
      ackAll();
    });

  observeMusicDownloadInit()
    .subscribe(async (message) => {
      const topic = new URL('http://localhost:3334/download/init');
      topic.searchParams.append('user', message.body.userId.toString());

      const data = {
        topic: topic.toString(),
        data: message.body,
      };

      console.log('init', data)

      await hubPublish(data);
      message.ack();
    });

  observeMusicDownloaded()
    .subscribe(async message => {
      const topic = new URL('http://localhost:3334/download/complete/music');
      topic.searchParams.append('user', message.body.userId.toString());

      const data = {
        topic: topic.toString(),
        data: message.body,
      };

      //console.log('downloaded', data)

      await hubPublish(data);
      message.ack();
    });
}
