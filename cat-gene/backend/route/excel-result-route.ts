import Koa, { Context, ParameterizedContext } from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import ExcelJS, { Workbook, Worksheet } from 'exceljs';

const app = new Koa();

class ExcelResultRoute {
  static async outputExcel(ctx: ParameterizedContext, next: Function) {
    try {

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('My Sheet', { properties: { tabColor: { argb: 'FFC0000' } } });

      workbook.creator = 'steve';
      workbook.lastModifiedBy = 'steve';
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();


      worksheet.columns = [{ header: 'Id', key: 'id', width: 10 }];

      worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 2, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 3, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 4, name: 'John Doe', dob: new Date(1970, 1, 1) });
      await workbook.xlsx.writeFile('export3.xlsx').then(function () {
        ctx.body = '123';
      });
      fs.unlink('export3.xlsx');
      console.log("File is written");
      await next();
    } catch (error) {

    }
  }
}

const excelRouter = new Router();
excelRouter.post('/output', ExcelResultRoute.outputExcel);
export { excelRouter };