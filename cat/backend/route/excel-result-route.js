"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelRouter = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const exceljs_1 = __importDefault(require("exceljs"));
const app = new koa_1.default();
class ExcelResultRoute {
    static outputExcel(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = new exceljs_1.default.Workbook();
                const worksheet = workbook.addWorksheet("My Sheet");
                workbook.creator = 'Me';
                workbook.lastModifiedBy = 'Her';
                workbook.created = new Date(1985, 8, 30);
                workbook.modified = new Date();
                workbook.lastPrinted = new Date(2016, 9, 27);
                worksheet.columns = [{ header: 'Id', key: 'id', width: 10 }];
                worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
                // save under export.xlsx
                yield workbook.xlsx.writeFile('export.xlsx');
                console.log("File is written");
                yield next();
            }
            catch (error) {
            }
        });
    }
}
const excelRouter = new koa_router_1.default();
exports.excelRouter = excelRouter;
excelRouter.post('/output', ExcelResultRoute.outputExcel);
