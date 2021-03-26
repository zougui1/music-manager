import { VideoSearchResult, OptionsWithQuery, OptionsWithSearch } from 'yt-search';
import { SearchCriterias, TestedYoutubeVideo } from './types';
export declare class YoutubeSearch {
    static findVideoLink(search: string | OptionsWithQuery | OptionsWithSearch): Promise<string | undefined>;
    static findVideos(search: string | OptionsWithQuery | OptionsWithSearch): Promise<VideoSearchResult[]>;
    static findMostCorrectVideo(criterias: SearchCriterias): Promise<TestedYoutubeVideo | undefined>;
    private static buildUrl;
}
//# sourceMappingURL=YoutubeSearch.d.ts.map