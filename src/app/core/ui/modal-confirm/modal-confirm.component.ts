import { Component, OnInit, Inject } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
} from '@angular/material/dialog';
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {NgClass} from "@angular/common";

@Component({
    selector: 'vex-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss'],
    imports: [
        MatIcon,
        MatDivider,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        NgClass
    ],
    standalone: true
})
export class ModalConfirmComponent implements OnInit {

    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ModalConfirmComponent>,
    ) { }

    ngOnInit(): void {}
    
    aceptar() {
        this.dialogRef.close(true);
    }

}
