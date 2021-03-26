import { observeMusicDownloadProgress } from 'notification-pkg'
import { hubPublish } from 'hub-publish-pkg';

observeMusicDownloadProgress()
  .subscribe(async ({ messages, ackAll }) => {
    console.log('progresses:', messages.map(m => m.body.videoId))
    const topic = 'http://localhost:3334/progress';
    const data = {
      topic,
      data: messages[0].body,
    };

    await hubPublish(data);
    ackAll();
  });
