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
exports.Music = void 0;
const typeorm_1 = require("typeorm");
const validation_pkg_1 = require("validation-pkg");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const playlist_to_music_entity_1 = require("./playlist-to-music.entity");
let Music = class Music extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.title.maxLength }),
    __metadata("design:type", String)
], Music.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.link.maxLength }),
    __metadata("design:type", String)
], Music.prototype, "link", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], Music.prototype, "artists", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.album.maxLength }),
    __metadata("design:type", String)
], Music.prototype, "album", void 0);
__decorate([
    typeorm_1.Column('simple-json'),
    __metadata("design:type", String)
], Music.prototype, "source", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.music.thumbnail.maxLength }),
    __metadata("design:type", String)
], Music.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], Music.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column('float', { unsigned: true }),
    __metadata("design:type", Number)
], Music.prototype, "duration", void 0);
__decorate([
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], Music.prototype, "approved", void 0);
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], Music.prototype, "correctness", void 0);
__decorate([
    typeorm_1.OneToMany(() => playlist_to_music_entity_1.PlaylistToMusic, playlistToMusic => playlistToMusic.playlist),
    __metadata("design:type", Array)
], Music.prototype, "playlistToMusics", void 0);
__decorate([
    typeorm_1.Column('int', { unsigned: true }),
    __metadata("design:type", Number)
], Music.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.musics),
    __metadata("design:type", user_entity_1.User)
], Music.prototype, "user", void 0);
Music = __decorate([
    typeorm_1.Entity()
], Music);
exports.Music = Music;
//# sourceMappingURL=music.entity.js.map