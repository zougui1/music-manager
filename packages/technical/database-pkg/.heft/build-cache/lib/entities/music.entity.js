"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicEntity = void 0;
const typeorm_1 = require("typeorm");
const validation_pkg_1 = require("validation-pkg");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const playlist_to_music_entity_1 = require("./playlist-to-music.entity");
const music_playing_entity_1 = require("./music-playing.entity");
let MusicEntity = class MusicEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.title.maxLength }),
    __metadata("design:type", String)
], MusicEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.link.maxLength }),
    __metadata("design:type", String)
], MusicEntity.prototype, "link", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], MusicEntity.prototype, "artists", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.album.maxLength }),
    __metadata("design:type", String)
], MusicEntity.prototype, "album", void 0);
__decorate([
    typeorm_1.Column('simple-json'),
    __metadata("design:type", Object)
], MusicEntity.prototype, "source", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.thumbnail.maxLength }),
    __metadata("design:type", String)
], MusicEntity.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], MusicEntity.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column('float', { unsigned: true }),
    __metadata("design:type", Number)
], MusicEntity.prototype, "duration", void 0);
__decorate([
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], MusicEntity.prototype, "approved", void 0);
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], MusicEntity.prototype, "correctness", void 0);
__decorate([
    typeorm_1.OneToMany(() => playlist_to_music_entity_1.PlaylistToMusicEntity, playlistToMusic => playlistToMusic.playlist, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], MusicEntity.prototype, "playlistToMusics", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.musics),
    __metadata("design:type", user_entity_1.UserEntity)
], MusicEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => music_playing_entity_1.MusicPlayingEntity, musicPlaying => musicPlaying.music, { cascade: true }),
    __metadata("design:type", Array)
], MusicEntity.prototype, "playings", void 0);
MusicEntity = __decorate([
    typeorm_1.Entity({ name: 'musics' })
], MusicEntity);
exports.MusicEntity = MusicEntity;
//# sourceMappingURL=music.entity.js.map