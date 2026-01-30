import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    @HostListener('mouseenter')
    onEnter() {
        this.ChangeBgColor('red');

    }
    ChangeBgColor(color: string) {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    }

    @HostListener('mouseleave')
    onLeave() {
        this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
        this.ChangeBgColor('yellow');
    }

    @HostListener('click') onClick() {
        window.alert('Host Element Clicked');
    }
}