import Koa, { Context, ParameterizedContext } from 'koa';
import Router from 'koa-router';

const app = new Koa();

function computeGene(papa: any[], mama: any[]) {
  let dimensions: any[] = [];
  dimensions.push(papa);
  dimensions.push(mama);

  console.log(mama, papa);

  let result: string[] = [];
  function explore(curDim: string | any[], prefix: string) {
    var nextDim = dimensions.shift();
    for (var i = 0; i < curDim.length; i++) {
      if (nextDim)
        explore(nextDim, prefix + curDim[i] + "/");
      else
        result.push(prefix + curDim[i]);
    }
    if (nextDim) dimensions.push(nextDim);
  }
  explore(dimensions.shift(), "");
  return toNumberGene(result);
}
function toNumberGene(data: any[]) {
  const resArray = [];
  const base: number = data.length;
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
    }
    resArray.push(obj);
  }
  return resArray;
}

class BengalConstroller {
  static async compute(ctx: ParameterizedContext, next: Function) {
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

    await next();
  }
}

const bengalRouter = new Router();
bengalRouter.post('/', BengalConstroller.compute);
export { bengalRouter };