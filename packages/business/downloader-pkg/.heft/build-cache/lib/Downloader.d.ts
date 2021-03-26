import { Downloader as IDownloader, DownloadedAudio } from 'types-pkg';
export declare class Downloader implements IDownloader {
    readonly urlOrId: string;
    readonly downloader: IDownloader;
    constructor(urlOrId: string);
    downloadAudio(): Promise<DownloadedAudio[]>;
}
//# sourceMappingURL=Downloader.d.ts.map