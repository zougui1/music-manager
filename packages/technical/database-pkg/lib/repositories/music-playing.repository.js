"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicPlayingRepository = void 0;
const typeorm_1 = require("typeorm");
const base_repository_1 = require("./base.repository");
const entities_1 = require("../entities");
let MusicPlayingRepository = class MusicPlayingRepository extends base_repository_1.BaseRepository {
};
MusicPlayingRepository = __decorate([
    typeorm_1.EntityRepository(entities_1.MusicPlayingEntity)
], MusicPlayingRepository);
exports.MusicPlayingRepository = MusicPlayingRepository;
//# sourceMappingURL=music-playing.repository.js.map