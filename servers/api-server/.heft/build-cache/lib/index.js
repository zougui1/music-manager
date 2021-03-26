"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
require("./setup");
// std
const http = __importStar(require("http"));
// 3p
const core_1 = require("@foal/core");
// App
const controllers_1 = require("./app/controllers");
async function main() {
    const app = await core_1.createApp(controllers_1.AppController);
    const httpServer = http.createServer(app);
    const port = core_1.Config.get('port', 'number', 3001);
    httpServer.listen(port, () => core_1.displayServerURL(port));
}
main()
    .catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map