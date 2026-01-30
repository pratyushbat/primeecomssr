import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[appInputControl]'
})
export class InputClassDirective {
    @Input() readonlyMode = false;
    @Input() requiredMode = false;

    @HostBinding('attr.readonly')
    get readonlyAttr() {
        return this.readonlyMode ? true : null;
    }

    @HostBinding('attr.required')
    get requiredAttr() {
        return this.requiredMode ? true : null;
    }
}