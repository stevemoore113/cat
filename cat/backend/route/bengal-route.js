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
exports.bengalRouter = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const app = new koa_1.default();
function computeGene(papa, mama) {
    let dimensions = [];
    dimensions.push(papa);
    dimensions.push(mama);
    console.log(mama, papa);
    let result = [];
    function explore(curDim, prefix) {
        var nextDim = dimensions.shift();
        for (var i = 0; i < curDim.length; i++) {
            if (nextDim)
                explore(nextDim, prefix + curDim[i] + "/");
            else
                result.push(prefix + curDim[i]);
        }
        if (nextDim)
            dimensions.push(nextDim);
    }
    explore(dimensions.shift(), "");
    return result;
}
class BengalConstroller {
    static compute(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * []
             * 獨立 雪豹snow ['cs','x'] ['cb','x'] '['cs','cs']' '['cb','cs']' '['cb','cb']'  ['x','x']
             * 獨立 銀豹sliver ['s','x'] ['s','x']
             * 合一 炭豹charcoa ['abp','a'] ['abp','abp'] ['abp','A']
             * 合一 黑豹black ['a','a'] ['A','a']
             * 獨立 閃光flaten ['b','x']['x','x']
             */
            const gene = { snow: ['', ''], snow2: ['', ''] };
            gene.snow = ['cs', 'cs'];
            gene.snow2 = ['x', 'cs'];
            const resSnow = computeGene(gene.snow, gene.snow2);
            console.log(resSnow);
            // const resCharcoa = computeGene(gene.Char, gene.Char2);
            // const resSliver = computeGene(gene.sliver, gene.sliver2);
            // const resFlat = computeGene(gene.flat, gene.flat2);
            // const resBlack = computeGene(gene.black, gene.black2);
            yield next();
        });
    }
}
const bengalRouter = new koa_router_1.default();
exports.bengalRouter = bengalRouter;
bengalRouter.get('/', BengalConstroller.compute);
