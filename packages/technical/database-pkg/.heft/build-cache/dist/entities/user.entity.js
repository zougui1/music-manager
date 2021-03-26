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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const validation_pkg_1 = require("validation-pkg");
const base_entity_1 = require("./base.entity");
const music_entity_1 = require("./music.entity");
const playlist_entity_1 = require("./playlist.entity");
let User = class User extends base_entity_1.BaseEntity {
    async hashPassword() {
        if (this.password && !this.password.startsWith('$argon2')) {
            // TODO
            //this.password = await hash(this.password);
        }
    }
};
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.user.name.maxLength }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: validation_pkg_1.rules.user.email.maxLength }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => playlist_entity_1.Playlist, playlist => playlist.user),
    __metadata("design:type", Array)
], User.prototype, "playlists", void 0);
__decorate([
    typeorm_1.OneToMany(() => music_entity_1.Music, music => music.user),
    __metadata("design:type", Array)
], User.prototype, "musics", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map