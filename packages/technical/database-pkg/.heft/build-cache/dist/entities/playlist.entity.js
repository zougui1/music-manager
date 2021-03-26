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
exports.Playlist = void 0;
const typeorm_1 = require("typeorm");
const validation_pkg_1 = require("validation-pkg");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const playlist_to_music_entity_1 = require("./playlist-to-music.entity");
let Playlist = class Playlist extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.playlist.name.maxLength }),
    __metadata("design:type", String)
], Playlist.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('int', { unsigned: true }),
    __metadata("design:type", Number)
], Playlist.prototype, "order", void 0);
__decorate([
    typeorm_1.OneToMany(() => playlist_to_music_entity_1.PlaylistToMusic, playlistToMusic => playlistToMusic.playlist),
    __metadata("design:type", Array)
], Playlist.prototype, "playlistToMusics", void 0);
__decorate([
    typeorm_1.Column('int', { unsigned: true }),
    __metadata("design:type", Number)
], Playlist.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.musics),
    __metadata("design:type", user_entity_1.User)
], Playlist.prototype, "user", void 0);
Playlist = __decorate([
    typeorm_1.Entity()
], Playlist);
exports.Playlist = Playlist;
//# sourceMappingURL=playlist.entity.js.map