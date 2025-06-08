import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor() { }

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcel(excelBuffer, excelFileName);

  }


  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
  }



  exportToExcelCustom(jsonData: any[], excelFileName: string): void {
 
    const worksheetData = this.transformData(jsonData);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);

    
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private transformData(dataArray: any[]): any[] {
    const result = [];

    dataArray.forEach(data => {
        const mainData = {
            "N° Solicitud": data.solicitudeNumber,
            "Nombres": data.name,
            "Apellidos": data.fullLastName,
            "Estado Civil": data.civilState,
            "Fecha Cumpleaños": data.birthdayDateDescription,
            "Dependiente": data.dependences,
            "Tipo de Vivienda": data.typeHome,
            "Tiempo Residencia (Meses)": data.timeResidenceMonth,
            "ESTADO": data.solicitudeStateName,
            'Comentario': data.comment
        };
        result.push(mainData);

        // Add conyugeGarantes if they exist
        if (data.conyugeGarantes && data.conyugeGarantes.length > 0) {
            data.conyugeGarantes.forEach((conyuge: any) => {
                const conyugeData = {
                    "Conyuge-garante Nombres": conyuge.name,
                    "Conyuge-garante Apellido Paterno": conyuge.firstName,
                    "Conyuge-garante  Apellido Materno": conyuge.lastName,
                    "Conyuge-garante  Tipo Documento": conyuge.documentType,
                    "Conyuge-garante  N° Documento": conyuge.documentNumber,
                    "Conyuge-garante  N° Celular": conyuge.phoneNumber,
                    "Conyuge-garante  Correo Electrónico": conyuge.email,
                    "Conyuge-garante  Fecha Cumpleaños": conyuge.birthdayDateDescription,
                    "Conyuge-garante  Dependiente": conyuge.dependences,
                    "Conyuge-garante  Centro Laboral": conyuge.laborCenter,
                    "Conyuge-garante  Cargo": conyuge.charge,
                    "Conyuge-garante  Antiguedad Meses": conyuge.chargeOldMonth,
                    "Conyuge-garante  Independiente": conyuge.independent,
                    "Conyuge-garante  Actividad": conyuge.activity,
                    "Conyuge-garante  Antiguedad en Meses": conyuge.activityOldMonth,
                    "Conyuge-garante  Ingresos Mensuales": conyuge.monthlyIncome,
                    "Conyuge-garante  Otros Ingresos": conyuge.otherIncome,
                    "Conyuge-garante  Descripción de otros ingresos": conyuge.descriptionOtherIncome,
                    "Conyuge-garante  Dirección": conyuge.address,
                    "Conyuge-garante  Tipo de Conyuge": conyuge.typeConyugeGaranteName
                };
                result.push(conyugeData);
            });
        }

        // Add referencePersonalFamilies if they exist
        if (data.referencePersonalFamilies && data.referencePersonalFamilies.length > 0) {
            data.referencePersonalFamilies.forEach((reference: any) => {
                const referenceData = {
                    "Referencia Nombres": reference.name,
                    "Referencia Apellido Paterno": reference.firstName,
                    "Referencia Apellido Materno": reference.lastName,
                    "Referencia N° Celular": reference.phoneNumber,
                    "Referencia Tipo Referencia": reference.typeReferenceName
                };
                result.push(referenceData);
            });
        }

        // Add fileStorageUrls if they exist
        if (data.fileStorageUrls && data.fileStorageUrls.length > 0) {
            data.fileStorageUrls.forEach((file: any) => {
                const fileData = {
                    "Url del Archivo": file.fileUrl
                };
                result.push(fileData);
            });
        }
    });

    return result;
}




}
