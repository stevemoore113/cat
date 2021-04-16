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
    return toNumberGene(result);
}
function toNumberGene(data) {
    const resArray = [];
    const base = data.length;
    const geneSet = new Set();
    for (const c of data) {
        geneSet.add(c);
    }
    for (const c of geneSet) {
        let num = 0;
        for (const s of data) {
            if (c === s) {
                num = num + 1;
            }
        }
        const obj = {
            name: c,
            p: num / base,
        };
        resArray.push(obj);
    }
    return resArray;
}
class BengalConstroller {
    static compute(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * []
             * 獨立 snow ['cs','x'] ['cb','x'] '['cs','cs']' '['cb','cs']' '['cb','cb']'  ['x','x']
             * 獨立 sliver ['s','x'] ['s','x']
             * 合一 charcoa ['abp','a'] ['abp','abp'] ['abp','A']
             * 合一 black ['a','a'] ['A','a']
             * 獨立 flaten ['b','x']['x','x']
             */
            const resArray = [];
            const gene = ctx.request.body;
            console.log(gene);
            const resSnow = computeGene(gene.baba.snow, gene.mama.snow);
            const resCharcoa = computeGene(gene.baba.char, gene.mama.char);
            const resSliver = computeGene(gene.baba.sliver, gene.mama.sliver);
            const resFlat = computeGene(gene.baba.flat, gene.mama.flat);
            const resBlack = computeGene(gene.baba.black, gene.mama.black);
            resArray.push(resSnow);
            resArray.push(resCharcoa);
            resArray.push(resSliver);
            resArray.push(resFlat);
            resArray.push(resBlack);
            ctx.body = resArray;
            yield next();
        });
    }
}
const bengalRouter = new koa_router_1.default();
exports.bengalRouter = bengalRouter;
bengalRouter.post('/', BengalConstroller.compute);
