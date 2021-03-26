/// <reference types="node" />
import { Readable } from 'stream';
import { FfmpegCommandOptions, FfmpegCommand } from 'fluent-ffmpeg';
export declare function ffmpeg(options?: FfmpegCommandOptions): FfmpegCommand;
export declare function ffmpeg(input?: string | Readable, options?: FfmpegCommandOptions): FfmpegCommand;
declare module 'fluent-ffmpeg' {
    interface FfmpegCommand {
        promise: Promise<any>;
    }
}
//# sourceMappingURL=ffmpeg.d.ts.map