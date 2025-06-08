import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {toBase64} from "../../utils/functions/helpers";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: "app-file-selector",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./file-selector.component.html",
    styleUrls: ["./file-selector.component.scss"],
})
export class FileSelectorComponent implements OnInit {
    fileBase64: string;

    fileName: string;
    fileType: string;
    fileSize: number;

    @Input() urlCurrentFile: string;

    @Output() selectedFile: EventEmitter<{
        fileName: string;
        fileType: string;
        fileSize: number;
        extension: string;
        data: string
    }> = new EventEmitter<{ fileName: string; fileType: string; fileSize: number; extension: string; data: string }>();

    constructor() {
    }

    ngOnInit(): void {
    }

    selectedFiles(event: Event) {
        if (event.target instanceof HTMLInputElement) {
            const inputElement: HTMLInputElement = event.target;
            if (inputElement.files && inputElement.files.length > 0) {
                const file: File = inputElement.files[0];
                this.fileName = file.name;
                this.fileType = file.type;
                this.fileSize = file.size;
                const fileExtension = this.fileName.split('.').pop();

                toBase64(file).then((value: string) => {
                    this.fileBase64 = value;
                    this.selectedFile.emit({
                        fileName: this.fileName,
                        fileType: this.fileType,
                        fileSize: this.fileSize,
                        extension: fileExtension,
                        data: this.fileBase64
                    });
                });

                this.urlCurrentFile = null;
            }
        }
    }

    getReadableFileSize(size: number): string {
        if (size < 1024) {
            return size + ' B';
        } else if (size < 1048576) {
            return (size / 1024).toFixed(2) + ' KB';
        } else if (size < 1073741824) {
            return (size / 1048576).toFixed(2) + ' MB';
        } else {
            return (size / 1073741824).toFixed(2) + ' GB';
        }
    }

    // Método para verificar si el archivo es una imagen
    isImage(url: string): boolean {
        return /\.(jpg|jpeg|png)$/i.test(url);
    }

    // Método para verificar si el archivo es un PDF
    isPdf(url: string): boolean {
        return /\.pdf$/i.test(url);
    }

    // Método para verificar si el archivo es un CSV
    isCsv(url: string): boolean {
        return /\.csv$/i.test(url);
    }

    // Método para extraer el nombre del archivo de la URL
    getFileName(url: string): string {
        return url.split('/').pop();
    }
}
