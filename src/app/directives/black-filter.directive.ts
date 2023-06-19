import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
    selector: '[appBlackFilter]',
    standalone: true
})
export class BlackFilterDirective implements OnInit, OnDestroy{

    private el: ElementRef = inject(ElementRef)
    private renderer: Renderer2 =inject(Renderer2)

    private observer!: IntersectionObserver

    ngOnInit() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.renderer.setStyle(this.el.nativeElement, 'filter', 'none');
                this.renderer.setStyle(this.el.nativeElement, 'transition', 'filter 0.5s ease');
              } else {
                this.renderer.setStyle(this.el.nativeElement, 'filter', 'grayscale(100%)');
                this.renderer.setStyle(this.el.nativeElement, 'transition', 'filter 0.5s ease');
              }
            });
          }, options);

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect()
    }

}
