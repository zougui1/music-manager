export declare const writeMetadata: (file: string, data: MusicMetadata) => Promise<void>;
export interface MusicMetadata {
    artist: string;
    album: string;
    title: string;
    date: string;
    attachments: string[];
}
//# sourceMappingURL=writeMetadata.d.ts.map