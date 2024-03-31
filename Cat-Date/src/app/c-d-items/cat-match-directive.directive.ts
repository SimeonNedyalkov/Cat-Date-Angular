import { Directive, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CatServiceService } from '../shared/cat-service.service';

@Directive({
  selector: '[appCatMatchDirective]'
})
export class CatMatchDirectiveDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2){}
  
  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('p'), 'color', 'yellow');
  }
  
  
}
