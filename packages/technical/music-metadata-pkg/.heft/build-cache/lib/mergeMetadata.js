"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMusicMetadata = void 0;
const filesystem_pkg_1 = __importDefault(require("filesystem-pkg"));
const got_1 = __importDefault(require("got"));
const path_1 = __importDefault(require("path"));
const ffmpeg_pkg_1 = require("ffmpeg-pkg");
const writeMetadata_1 = require("./writeMetadata");
const defaultExtension = 'jpg';
const writeDownloadStream = (url) => {
    return new Promise((resolve, reject) => {
        const writer = filesystem_pkg_1.default.createWriteStream(path_1.default.extname(url) || defaultExtension);
        const download = got_1.default.stream(url);
        download.on('error', reject).pipe(writer);
        writer.on('error', reject).waitFinish(resolve);
    });
};
const mergeMusicMetadata = async (output, musicData) => {
    const cover = await writeDownloadStream(musicData.coverUrl);
    const metadata = {
        artist: musicData.artists.join(', '),
        album: musicData.albumName,
        title: musicData.name,
        date: musicData.releaseDate,
        attachments: [cover],
    };
    await writeMetadata_1.writeMetadata(output, metadata);
    const tempPath = filesystem_pkg_1.default.getTempPath({ extension: path_1.default.extname(output) });
    await ffmpeg_pkg_1.ffmpeg(output)
        .addOutputOptions('-i', cover, '-map', '0:0', '-map', '1:0', '-c', 'copy', '-id3v2_version', '3')
        .save(tempPath)
        .promise;
    await filesystem_pkg_1.default.unlink(output);
    await filesystem_pkg_1.default.rename(tempPath, output);
    return cover;
};
exports.mergeMusicMetadata = mergeMusicMetadata;
//# sourceMappingURL=mergeMetadata.js.map