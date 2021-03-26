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
exports.MusicPlayingEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const music_entity_1 = require("./music.entity");
let MusicPlayingEntity = class MusicPlayingEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], MusicPlayingEntity.prototype, "startedAt", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], MusicPlayingEntity.prototype, "platform", void 0);
__decorate([
    typeorm_1.Column('simple-json'),
    __metadata("design:type", Object)
], MusicPlayingEntity.prototype, "steps", void 0);
__decorate([
    typeorm_1.ManyToOne(() => music_entity_1.MusicEntity, music => music.playings, { onDelete: 'CASCADE' }),
    __metadata("design:type", music_entity_1.MusicEntity)
], MusicPlayingEntity.prototype, "music", void 0);
MusicPlayingEntity = __decorate([
    typeorm_1.Entity({ name: 'music_playings' })
], MusicPlayingEntity);
exports.MusicPlayingEntity = MusicPlayingEntity;
//# sourceMappingURL=music-playing.entity.js.map