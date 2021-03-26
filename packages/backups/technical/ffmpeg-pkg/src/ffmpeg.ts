import { Readable } from 'stream';
import ffmpegLib, { FfmpegCommandOptions, FfmpegCommand } from 'fluent-ffmpeg';

export function ffmpeg(options?: FfmpegCommandOptions): FfmpegCommand;
export function ffmpeg(input?: string | Readable, options?: FfmpegCommandOptions): FfmpegCommand;
export function ffmpeg(inputOrOptions?: FfmpegCommandOptions | string | Readable, options?: FfmpegCommandOptions): FfmpegCommand {
  const command = ffmpegLib(inputOrOptions as Readable, options);

  const promise = new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject);
  });

  command.promise = promise;

  return command;
}

declare module 'fluent-ffmpeg' {
  interface FfmpegCommand {
    promise: Promise<any>;
  }
}
