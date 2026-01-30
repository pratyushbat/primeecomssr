import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-custom-input',
    template: `
    <input class="form-control"
       type="text"
  [value]="value"
  [disabled]="isDisabled"
  (input)="handleInput($event)"
  (blur)="handleBlur()"
    />
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CustomInputComponent),
        multi: true
    }]
})
export class CustomInputComponent implements ControlValueAccessor {

    value = '';
    isDisabled = false;

    // callbacks provided by Angular
    private onChange = (_: any) => { };
    private onTouched = () => { };

    // Model → View
    writeValue(value: any): void {
        this.value = value ?? '';
    }

    // View → Model
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    // DOM event
    handleInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
    }

    handleBlur() {
        this.onTouched();
    }
}