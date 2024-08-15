import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core'

@Directive({
  selector: '[appBlackFilter]',
  standalone: true
})
export class BlackFilterDirective implements OnInit, OnDestroy {
  private readonly elementRef: ElementRef = inject(ElementRef)
  private readonly renderer: Renderer2 = inject(Renderer2)

  private observer!: IntersectionObserver

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none')
          this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'filter 0.5s ease')
        } else {
          this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'grayscale(100%)')
          this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'filter 0.5s ease')
        }
      })
    }, options)

    this.observer.observe(this.elementRef.nativeElement)
  }

  ngOnDestroy() {
    this.observer.disconnect()
  }
}
