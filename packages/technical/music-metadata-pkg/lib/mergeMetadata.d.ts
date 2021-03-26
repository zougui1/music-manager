export declare const mergeMusicMetadata: (output: string, musicData: MusicData) => Promise<string>;
export interface MusicData {
    coverUrl: string;
    artists: string[];
    albumName: string;
    name: string;
    releaseDate: string;
}
//# sourceMappingURL=mergeMetadata.d.ts.map