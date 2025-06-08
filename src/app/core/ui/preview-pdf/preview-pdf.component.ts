import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

//import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'app-preview-pdf',
    standalone: true,
    imports: [],
    templateUrl: './preview-pdf.component.html',
    styleUrl: './preview-pdf.component.scss'
})
export class PreviewPdfComponent implements OnInit {
    fileUrl: string;
    original_size_custom: boolean;


    constructor(@Inject(MAT_DIALOG_DATA) public data,
                private breakpointObserver: BreakpointObserver
    ) {
        this.original_size_custom = true;
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.fileUrl = this.data.fileUrl;
        }
        // Observe screen size changes
        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.original_size_custom = !result.matches;
        });
    }

    // Optionally, you can also listen to window resize events
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.checkScreenSize();
    }

    checkScreenSize() {
        const isMobile = window.innerWidth < 768; // You can adjust the breakpoint as needed
        this.original_size_custom = !isMobile;
    }

}
