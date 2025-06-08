import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MY_DATE_FORMATS} from '../../utils/functions/date-format';
import moment, {Moment} from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
    selector: 'app-filter-date-range-ymd',
    standalone: true,
    imports: [ MomentDateModule],
    templateUrl: './filter-date-range-ymd.component.html',
    styleUrls: ['./filter-date-range-ymd.component.scss'],
    providers: [{provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})
export class FilterDateRangeYmdComponent implements OnInit, OnChanges {
    @Input() start: string;
    @Input() end: string;
    @Input() maxDate: Moment = moment();
    @Output() rangeDate = new EventEmitter<any>();

    range = new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
    });


    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['start'] || changes['end']) {
            this.range.get("startDate").patchValue(this.start);
            this.range.get("endDate").patchValue(this.end);
        }
    }

    addEnvent(event: MatDatepickerInputEvent<Date>) {
        if (event.value != null) {
            this.emitDates();
        }
    }

    emitDates() {
        const startDateControl = this.range.get("startDate").value;
        const endDateControl = this.range.get("endDate").value;

        if (startDateControl && endDateControl) {
            const startDate = startDateControl.format("YYYY-MM-DD");
            const endDate = endDateControl.format("YYYY-MM-DD");
            const data = {startDate, endDate};
            this.rangeDate.emit(data);
        }
    }
}
