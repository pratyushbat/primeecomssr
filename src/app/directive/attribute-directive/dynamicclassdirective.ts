import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appDynamicClass]'
})
export class DynamicClassDirective {
    @Input('appDynamicClass') isActive = false;

    @Input() activeClasses = 'highlight';
    /*     @Input() activeBackground = 'red'; */
    @Input() activestyle = '';

    @Input() title = '';

    @Input('appDisable') isDisabled: boolean = false;
    /*    @HostBinding('class.active') get activeClass() {
           return this.isActive;
       } */

    @HostBinding('class') get activeClass() {
        return this.isActive ? this.activeClasses : '';
    }

    /*  @HostBinding('style.backgroundColor') get activeBg() {
         return !this.isActive ? this.activeBackground : '';
     } */

    @HostBinding('style') get activeBg() {
        return !this.isActive ? this.activestyle : '';
    }

    @HostBinding('attr.title') get attrTitle() {
        return this.isActive ? this.title : '';
    }
    @HostBinding('id') get idse() {
        return this.isActive ? this.title : '';
    }




    /*     @HostBinding('style')
        styles = 'color:white; background:black'; */


    @HostBinding('disabled')
    get disabled() {
        return this.isDisabled ? '' : null;
    }


    @Output() tracked = new EventEmitter<string>();

    @HostListener('click')
    onClick() {
        this.tracked.emit('Button clicked');
    }
}