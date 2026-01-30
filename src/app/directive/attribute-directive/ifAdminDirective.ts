import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appIfAdmin]'
})
export class IfAdminDirective {
    constructor(
        private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    @Input() set appIfAdmin(condition: boolean) {
        condition ? this.vcr.createEmbeddedView(this.tpl)
            : this.vcr.clear();
    }
}