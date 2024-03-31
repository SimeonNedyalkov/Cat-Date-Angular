import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSwipableDirective]'
})
export class SwipeableDirective  {
  // @HostListener('mousedown',['$event']) onMouseTouch(e:MouseEvent) {
  //   console.log('touched')
  //   this.onMouseMove
  //  }
  // @HostListener('mouseenter',['$event']) onMouseMovee(e:MouseEvent){
  //   console.log('moving')
  // }
  // @HostListener('mouseup',['$event']) onMouseLeave(e:MouseEvent){
  //   console.log('stopped moving')
  // }
  // onMouseMove(e:MouseEvent){
  //   console.log('moving')
  // }
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  
    
  
  
   
}