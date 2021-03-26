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
exports.AuthController = void 0;
const core_1 = require("@foal/core");
const user_pkg_1 = require("user-pkg");
const utils_1 = require("../../../utils");
let AuthController = class AuthController {
    async login(ctx, params, { email, password }) {
        const user = await this.user.login(email, password);
        const token = utils_1.generateToken(user);
        return new core_1.HttpResponseOK({ user, token });
    }
    async loginOptions() { return new core_1.HttpResponseOK(); }
};
__decorate([
    core_1.dependency,
    __metadata("design:type", user_pkg_1.User)
], AuthController.prototype, "user", void 0);
__decorate([
    core_1.Post('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    core_1.Options('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginOptions", null);
AuthController = __decorate([
    core_1.Log('AuthController', { body: true, params: true, query: true })
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map