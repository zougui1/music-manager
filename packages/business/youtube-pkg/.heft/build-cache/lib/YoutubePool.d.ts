import { YoutubeVideo } from './YoutubeVideo';
export declare class YoutubePool {
    static acceptedDurationOffset: number;
    videos: TestedYoutubeVideo[];
    expectedData: any;
    constructor(videos: YoutubeVideo[], expectedData: any);
    matchArtist(source: string | string[], artist: any): boolean;
    matchAgainstExpectations(video: TestedYoutubeVideo): Promise<void>;
    matchAll(): Promise<void>;
    getMostCorrectVideo(): Promise<TestedYoutubeVideo>;
}
interface TestedYoutubeVideo extends YoutubeVideo {
    correctness: number;
}
export {};
//# sourceMappingURL=YoutubePool.d.ts.map