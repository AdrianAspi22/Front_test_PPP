import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';


@Component({
    selector: 'app-button-reset-filters',
    standalone: true,
    imports: [MatIconModule],
    templateUrl: './button-reset-filters.component.html',
    styleUrls: ['./button-reset-filters.component.scss']
})
export class ButtonResetFiltersComponent {
    @Output() buttonClick = new EventEmitter<void>();

    emitClick() {
        return this.buttonClick.emit();
    }


}


