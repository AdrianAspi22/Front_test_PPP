import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-preview-image',
    standalone: true,
    imports: [],
    templateUrl: './preview-image.component.html',
    styleUrl: './preview-image.component.scss'
})
export class PreviewImageComponent implements OnInit {
    fileUrl: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data) {

    }

    ngOnInit(): void {
        if (this.data != null) {
            this.fileUrl = this.data.fileUrl
        }
    }
}
