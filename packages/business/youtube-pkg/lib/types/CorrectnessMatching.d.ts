import { YoutubeVideo } from '../YoutubeVideo';
export interface TestedYoutubeVideo extends YoutubeVideo {
    correctness: number;
}
export interface ExpectedData {
    artist: {
        name: string;
        altNames: string[];
    };
    album: string;
    title: string;
    duration: number;
}
export interface FormattedExpectedData {
    artistNames: string[];
    album: string;
    title: string;
    minDuration: number;
    maxDuration: number;
}
export interface FormattedVideoData {
    keywords: string[];
    category: string;
    title: string;
    duration: number;
}
//# sourceMappingURL=CorrectnessMatching.d.ts.map