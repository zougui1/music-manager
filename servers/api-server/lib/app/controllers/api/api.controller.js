"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const core_1 = require("@foal/core");
const jwt_1 = require("@foal/jwt");
const music_1 = require("./music");
const playlist_1 = require("./playlist");
const user_1 = require("./user");
const hooks_1 = require("../../hooks");
let ApiController = class ApiController {
    constructor() {
        this.subControllers = [
            core_1.controller('/musics', music_1.MusicController),
            core_1.controller('/playlists', playlist_1.PlaylistController),
            core_1.controller('/users', user_1.UserController),
        ];
    }
};
ApiController = __decorate([
    core_1.ApiInfo({
        title: 'Music API',
        version: '1.0.0',
    }),
    core_1.ApiServer({
        url: '/api',
    }),
    core_1.Log('API', { body: true, params: true, query: true }),
    jwt_1.JWTRequired(),
    hooks_1.RefreshJWT()
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map