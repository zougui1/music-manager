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
exports.FileController = void 0;
const core_1 = require("@foal/core");
const storage_1 = require("@foal/storage");
class FileController {
    async getOne(ctx) {
        let { fileName } = ctx.request.params;
        fileName = decodeURI(fileName);
        return this.disk.createHttpResponse(fileName);
    }
}
__decorate([
    core_1.dependency,
    __metadata("design:type", storage_1.Disk)
], FileController.prototype, "disk", void 0);
__decorate([
    core_1.Get('/:fileName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getOne", null);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map