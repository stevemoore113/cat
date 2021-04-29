"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const bengal_route_1 = require("./route/bengal-route");
const excel_result_route_1 = require("./route/excel-result-route");
const app = new koa_1.default();
app.use(koa_body_1.default());
const router = new koa_router_1.default();
app.use(bengal_route_1.bengalRouter.routes());
app.use(excel_result_route_1.excelRouter.routes());
app.listen(3000);
console.log('Server running on port 3000');
