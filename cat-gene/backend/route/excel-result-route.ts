import Koa, { Context, ParameterizedContext } from 'koa';
import Router from 'koa-router';
import ExcelJS, { Workbook, Worksheet } from 'exceljs';

const app = new Koa();

class ExcelResultRoute {
  static async outputExcel(ctx: ParameterizedContext, next: Function) {
    try {


      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("My Sheet");

      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Her';
      workbook.created = new Date(1985, 8, 30);
      workbook.modified = new Date();
      workbook.lastPrinted = new Date(2016, 9, 27);


      worksheet.columns = [{ header: 'Id', key: 'id', width: 10 }];

      worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      // save under export.xlsx
      await workbook.xlsx.writeFile('export.xlsx');
      console.log("File is written");
      await next();
    } catch (error) {

    }
  }
}

const excelRouter = new Router();
excelRouter.post('/output', ExcelResultRoute.outputExcel);
export { excelRouter };