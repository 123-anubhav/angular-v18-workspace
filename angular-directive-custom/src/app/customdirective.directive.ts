import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomdirective]',
  standalone: true
})
export class CustomdirectiveDirective implements OnInit {

  constructor(private elref: ElementRef, private render: Renderer2) { }

  private backgroundColor: string = "transparent";

  ngOnInit() {
    /* element Ref example
     this.elref.nativeElement.style.backgroundColor = 'teal';
    */
    /*
    Renderer2 example
     this.render.setStyle(this.elref.nativeElement, 'background-color', 'red');
   */
  }

  /* without event also working 
  @HostListener('mouseenter') mouseover() {
    this.render.setStyle(this.elref.nativeElement, 'background-color', 'teal');
    // this.elref.nativeElement.style.backgroundColor = this.backgroundColor;

  } */


  /*  hostlistener example 
    @HostListener('mouseenter') mouseover(eventData:Event) {
      this.render.setStyle(this.elref.nativeElement, 'background-color', 'teal');
      // this.elref.nativeElement.style.backgroundColor = this.backgroundColor;
  
    }
  
    @HostListener('mouseleave') mouseLeave(eventData:Event) {
      //this.render.setStyle(this.elref.nativeElement, 'background-color', 'transparent ');
      this.elref.nativeElement.style.backgroundColor = this.backgroundColor;
    }
  */

    // hostBinding Example

    @HostBinding('style.backgroundColor')
    private bgColor="";

    @HostListener('mouseenter') mouseover(eventData:Event) {
        this.bgColor='cyan';
    }
  
    @HostListener('mouseleave') mouseLeave(eventData:Event) {
      this.bgColor='transparent';
    }
}
