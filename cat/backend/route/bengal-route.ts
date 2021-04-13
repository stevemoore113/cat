import { getKernel } from '@tensorflow/tfjs-core';
import Koa from 'koa';
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
  return result;
}

class BengalConstroller {
  static async compute(ctx: any, next: Function) {
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

    await next();
  }
}

const bengalRouter = new Router();
bengalRouter.get('/', BengalConstroller.compute);
export { bengalRouter };