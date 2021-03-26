import { ManyMessages } from 'mq-pkg';
import { Observable } from 'rxjs';
export declare const observeMusicDownloadProgress: (options?: ObserveMusicDownloadProgressOptions | undefined) => Observable<ManyMessages>;
export declare const notifyMusicDownloadProgress: (data: any) => void;
export interface ObserveMusicDownloadProgressOptions {
    bufferTime?: number;
}
//# sourceMappingURL=queue.d.ts.map