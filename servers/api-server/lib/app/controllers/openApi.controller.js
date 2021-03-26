"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiController = void 0;
const swagger_1 = require("@foal/swagger");
const api_1 = require("./api");
class OpenApiController extends swagger_1.SwaggerController {
    constructor() {
        super(...arguments);
        this.options = { controllerClass: api_1.ApiController };
    }
}
exports.OpenApiController = OpenApiController;
//# sourceMappingURL=openApi.controller.js.map