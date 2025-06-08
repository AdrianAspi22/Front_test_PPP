import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SearchOptions} from "../../models/search-options.interface";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: "app-search-box-multiple",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatButtonModule
    ],
    templateUrl: "./search-box-multiple.component.html",
    styleUrls: ["./search-box-multiple.component.scss"],
})
export class SearchBoxMultipleComponent implements OnInit {
    form: FormGroup;

    @Input() searchOptions: any[] = [];
    @Input() currentValue: string = "";
    @Output() search = new EventEmitter<any>();

    labelSelection: SearchOptions = {
        label: "",
        value: 0,
        placeholder: "",
        validation: "",
        validation_desc: "",
        icon: "",
    };

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            searchValue: [""],
            searchData: [""],
        });
    }

    ngOnInit(): void {

        if (this.searchOptions && this.searchOptions.length > 0) {
            this.changeSelection(this.searchOptions[0]);
        }
        this.form.controls["searchData"].valueChanges.subscribe((e) => {
            if (e.trim() == "") {
                this.submit();
            }
        });
    }

    changeSelection(option: SearchOptions) {
        this.labelSelection = option;
        this.form.controls["searchValue"].setValue(option.value);
        this.labelSelection.validation_desc = option.validation_desc
            ? option.validation_desc
            : "";

        let min_length = option.min_length ? option.min_length : 1;
        this.setSearchStringValidation(option.validation, min_length);
    }

    setSearchStringValidation(validation: [], minLength: number) {
        let searchData = this.form.get("searchData");
        let setValidation = [];

        setValidation.push(Validators.required);
        setValidation.push(Validators.minLength(minLength));

        if (validation) {
            validation.forEach((e) => {
                setValidation.push(e);
            });
        }

        searchData.setValidators(setValidation);
    }

    submit() {
        let data = this.form.getRawValue();
        this.search.emit(data);
    }

    reset() {
        this.form.controls["searchData"].setValue("");
        this.submit();
    }
}
