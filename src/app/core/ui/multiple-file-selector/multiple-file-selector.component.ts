import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PreviewImageComponent } from "../preview-image/preview-image.component";
import { PreviewPdfComponent } from "../preview-pdf/preview-pdf.component";
import { toBase64 } from "../../utils/functions/helpers";
import { CommonModule } from "@angular/common";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-multiple-file-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiple-file-selector.component.html',
  styleUrls: ['./multiple-file-selector.component.scss']
})
export class MultipleFileSelectorComponent implements OnInit {

  @Output() selectedFilesEvent = new EventEmitter<{ fileName: string; fileType: string; extension: string; data: string }[]>();

 
  files: { fileName: string; fileType: string; fileBase64: string; fileSize: number; }[] = [];

  constructor(
    private dialog: MatDialog,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
  }


  
  selectedFiles(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const inputElement: HTMLInputElement = event.target;
      if (inputElement.files && inputElement.files.length > 0) {
        const files: FileList = inputElement.files;
        const filePromises: Promise<{ fileName: string; fileType: string; extension: string; data: string,size: number }>[] = [];
  
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileName = file.name;
          const fileType = file.type;
          const fileSize = file.size;
          const fileExtension = fileName.split('.').pop();

           if (this.isFileAlreadySelected(fileName)) {
           this._alert.warn('Atención',`El archivo '${fileName}' ya ha sido seleccionado.`);
            continue; 
          }

          if (!this.isAllowedFileType(fileType)) {
            this._alert.warn('Atención', `El tipo de archivo '${fileName}' no está permitido. Solo se permiten archivos de los siguientes tipos: jpg, jpeg, png y PDF.`);
            continue;
          }
  
          const filePromise = toBase64(file).then((value: string) => ({
            fileName: fileName,
            fileType: fileType,
            extension: fileExtension,
            data: value,
            size: fileSize
          }));
  
          filePromises.push(filePromise);
        }
  
        Promise.all(filePromises).then(fileDetails => {
          const newFiles = fileDetails.map(file => ({
            fileName: file.fileName,
            fileType: file.fileType,
            fileBase64: file.data,
            fileSize: file.size
          }));
          this.files.push(...newFiles); 
          this.selectedFilesEvent.emit(this.getEmitFiles());
          inputElement.value = '';
        });
      }
    }
  }

  isImage(fileType: string): boolean {
    return /^(image\/jpg|image\/jpeg|image\/png)$/i.test(fileType);
  }

  isPdf(fileType: string): boolean {
    return /^application\/pdf$/i.test(fileType);
  }
  
  getFileName(url: string): string {
    return url.split('/').pop();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.selectedFilesEvent.emit(this.getEmitFiles());
  }

 
  
  getEmitFiles() {
    return this.files.map(file => ({
      fileName: file.fileName,
      fileType: file.fileType,
      extension: file.fileName.split('.').pop(),
      data: file.fileBase64,
      size: file.fileSize
    }));
  }

  getReadableFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + ' KB';
    } else if(size < 1073741824){
      return (size / 1048576).toFixed(2) + ' MB';
    } else{
      return (size / 1073741824).toFixed(2) + ' GB';
    }
  }
  
  private isFileAlreadySelected(fileName: string): boolean {
    return this.files.some(file => file.fileName === fileName);
  }

  private isAllowedFileType(fileType: string): boolean {
    return this.isImage(fileType) || this.isPdf(fileType);
  }

  openPreviewImage(fileUrl: string): void {
    this.dialog.open(PreviewImageComponent, {
      disableClose: true,
      data: { fileUrl: fileUrl },
      panelClass: 'preview-dialog',
    });
  }

  openPreviewPdf(fileUrl: string): void {
    this.dialog.open(PreviewPdfComponent, {
      disableClose: true,
      data: { fileUrl: fileUrl },
      panelClass: 'preview-dialog',
    });
  }
}
