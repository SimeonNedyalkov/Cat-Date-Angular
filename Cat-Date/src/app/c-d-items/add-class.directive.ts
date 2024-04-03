import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddClass]'
})
export class AddClassDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'cats-matched-message');
  }
}