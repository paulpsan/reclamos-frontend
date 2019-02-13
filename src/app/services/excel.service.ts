import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";

const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log(worksheet);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');

    /* save to file */
    XLSX.writeFile(
      wb,
      excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
